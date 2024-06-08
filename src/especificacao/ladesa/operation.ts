import { Query as HttpQuery, Param, SetMetadata, UseInterceptors, applyDecorators, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { Query as GqlQuery, Mutation } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CheckOperation, CheckType, CheckTypeFile } from '@unispec/ast-builder';
import { camelCase } from 'lodash';
import { getLadesaNodesRepository } from './repository';
import { COMBINED_INPUT_PARAM, CompileDtoCtor, OPERATION_KEY } from './utils';

const detectStrategy = (node: any) => {
  if (node && CheckTypeFile(node)) {
    return 'file';
  }

  return 'dto';
};

export const Operation = (token: string) => {
  const repository = getLadesaNodesRepository();

  const decorators: MethodDecorator[] = [];

  const operation = repository.FindByName(token);

  if (!CheckOperation(operation)) {
    throw new Error(`Operation not found: ${token}`);
  }

  decorators.push(SetMetadata(OPERATION_KEY, operation));

  const combinedInputParameterDecorators: ParameterDecorator[] = [];

  //

  decorators.push(
    ApiOperation({
      operationId: camelCase(operation.name),
      description: operation.description,
    }),
  );

  decorators.push(ApiBearerAuth());

  decorators.push(
    ApiResponse({
      status: 403,
      description: 'O solicitante não tem permissão para executar esta ação.',
    }),
  );

  const input = operation.input;

  if (input) {
    const inputBody = input.body;

    const inputBodyTarget = inputBody ? repository.GetRealTarget(inputBody) : null;

    switch (detectStrategy(inputBodyTarget)) {
      case 'file': {
        decorators.push(ApiConsumes('multipart/form-data'));

        decorators.push(
          ApiBody({
            schema: {
              type: 'object',
              required: ['file'],
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                  nullable: false,
                },
              },
            },
          }),
        );

        decorators.push(UseInterceptors(FileInterceptor('file')));

        break;
      }

      case 'dto': {
        for (const [key, opaqueTargetNode] of Object.entries(input.params ?? {})) {
          const name = key;

          const realTargetNode = repository.GetRealTarget(opaqueTargetNode);

          if (CheckType(realTargetNode)) {
            decorators.push(
              ApiParam({
                name: name,
                required: realTargetNode.required,
                description: realTargetNode.description,
              }),
            );

            combinedInputParameterDecorators.push(Param(name));
          } else {
            throw new TypeError(`Invalid param real target: ${name}.`);
          }
        }

        for (const [key, opaqueTargetNode] of Object.entries(input.queries ?? {})) {
          const name = key;

          const realTargetNode = repository.GetRealTarget(opaqueTargetNode);

          if (CheckType(realTargetNode)) {
            decorators.push(
              ApiQuery({
                name: name,
                required: realTargetNode.required,
                description: realTargetNode.description,
              }),
            );

            combinedInputParameterDecorators.push(HttpQuery(name));
          } else {
            throw new TypeError(`Invalid query real target: ${name}.`);
          }
        }

        const inputBodyCtor = inputBodyTarget && CompileDtoCtor(inputBodyTarget, { mode: 'input' });

        if (inputBodyCtor) {
          decorators.push(
            ApiBody({
              type: inputBodyCtor,
            }),
          );
        }

        break;
      }

      default: {
        throw new TypeError('Unsupported operation.input.strategy');
      }
    }
  }

  const output = operation.output;
  const outputSuccess = output?.success;
  const outputSuccessTarget = outputSuccess ? repository.GetRealTarget(outputSuccess) : null;

  if (output) {
    switch (detectStrategy(outputSuccessTarget)) {
      case 'file': {
        const file = outputSuccessTarget;

        if (CheckTypeFile(file)) {
          decorators.push(ApiProduces(...file.mimeTypes));

          decorators.push(
            ApiResponse({
              status: 200,
              schema: {
                type: 'string',
                format: 'binary',
                nullable: false,
              },
              description: file.description,
            }),
          );
        }

        break;
      }

      case 'dto': {
        const results = [
          {
            status: 200,
            resultNode: outputSuccessTarget ?? undefined,
          },
        ];

        for (const result of results) {
          const { status, resultNode } = result;
          const resultCtor = resultNode && CompileDtoCtor(resultNode, { mode: 'output' });

          const description = `Sucesso na operação "${operation.name}".`;

          decorators.push(
            ApiResponse({
              status,
              description: description,
              type: resultCtor ?? undefined,
            }),
          );
        }

        const SuccessDto = outputSuccessTarget && CompileDtoCtor(outputSuccessTarget, { mode: 'output' });

        switch (operation.meta?.gql?.kind) {
          case 'query': {
            decorators.push(
              GqlQuery(() => SuccessDto, {
                name: camelCase(operation.name),
                description: operation.description,
              }),
            );

            break;
          }
          case 'mutation': {
            decorators.push(
              Mutation(() => SuccessDto, {
                name: camelCase(operation.name),
                description: operation.description,
              }),
            );

            break;
          }

          default: {
            break;
          }
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  decorators.push(
    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),
  );

  decorators.push((target, propertyKey, descriptor) => {
    if (descriptor.value) {
      const combinedInputParam = Reflect.getMetadata(COMBINED_INPUT_PARAM, descriptor.value);

      if (combinedInputParam) {
        const { parameterIndex } = combinedInputParam;

        combinedInputParameterDecorators.push(
          createParamDecorator((_, context: ExecutionContextHost) => {
            const httpContext = context.switchToHttp();

            const request = httpContext.getRequest();

            const body = request.body;
            const params = request.params;
            const queries = request.query;

            return { body, params, queries };
          })(),
        );

        for (const paramDecorator of combinedInputParameterDecorators) {
          paramDecorator(target, propertyKey, parameterIndex);
        }
      }
    }
  });

  return applyDecorators(...decorators);
};
