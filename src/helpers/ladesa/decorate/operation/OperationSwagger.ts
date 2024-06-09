import { Param as HttpParam, Query as HttpQuery, UseInterceptors, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CheckType, CheckTypeFile } from '@unispec/ast-builder';
import { camelCase } from 'lodash';
import { COMBINED_INPUT_PARAM } from './CombinedInput';
import { AbstractOperationDecoratorsHandler, BuildDtoCtor, DecorateMethodContext, detectStrategy, swaggerTypeCompiler } from './utils';

export class OperationDecoratorsHandlerSwagger extends AbstractOperationDecoratorsHandler {
  HandleOutput(context: DecorateMethodContext) {
    const { operation, repository } = context;

    const output = operation.output;
    const outputSuccess = output?.success;

    const outputSuccessTarget = outputSuccess ? repository.GetRealTarget(outputSuccess) : null;

    if (output) {
      switch (detectStrategy(outputSuccessTarget)) {
        case 'file': {
          const file = outputSuccessTarget;

          if (CheckTypeFile(file)) {
            context.Add(ApiProduces(...file.mimeTypes));

            context.Add(
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
            const resultCtor = resultNode && BuildDtoCtor(resultNode, { mode: 'output' });

            const description = `Sucesso na operação "${operation.name}".`;

            context.Add(
              ApiResponse({
                status,
                description: description,
                type: resultCtor ?? undefined,
              }),
            );
          }

          break;
        }

        default: {
          break;
        }
      }
    }

    context.Add(
      ApiResponse({
        status: 403,
        description: 'O solicitante não tem permissão para executar esta ação.',
      }),
    );

    context.Add(
      ApiResponse({
        status: 404,
        description: 'Registro não encontrado.',
      }),
    );
  }

  HandleInput(context: DecorateMethodContext) {
    const { operation, repository } = context;

    const combinedInputParameterDecorators: ParameterDecorator[] = [];

    const input = operation.input;

    if (input) {
      const inputBody = input.body;

      const inputBodyTarget = inputBody ? repository.GetRealTarget(inputBody) : null;

      switch (detectStrategy(inputBodyTarget)) {
        case 'file': {
          context.Add(ApiConsumes('multipart/form-data'));

          context.Add(
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

          context.Add(UseInterceptors(FileInterceptor('file')));

          break;
        }

        case 'dto': {
          for (const [key, opaqueTargetNode] of Object.entries(input.params ?? {})) {
            const name = key;

            const realTargetNode = repository.GetRealTarget(opaqueTargetNode);

            if (CheckType(realTargetNode)) {
              context.Add(
                ApiParam({
                  ...swaggerTypeCompiler.Handle(realTargetNode),
                  name: name,
                  required: realTargetNode.required,
                  description: realTargetNode.description,
                }),
              );

              combinedInputParameterDecorators.push(HttpParam(name));
            } else {
              throw new TypeError(`Invalid param real target: ${name}.`);
            }
          }

          for (const [key, opaqueTargetNode] of Object.entries(input.queries ?? {})) {
            const name = key;

            const realTargetNode = repository.GetRealTarget(opaqueTargetNode);

            if (CheckType(realTargetNode)) {
              context.Add(
                ApiQuery({
                  ...swaggerTypeCompiler.Handle(realTargetNode),
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

          const inputBodyCtor = inputBodyTarget && BuildDtoCtor(inputBodyTarget, { mode: 'input' });

          if (inputBodyCtor) {
            context.Add(
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

    context.Add((target, propertyKey, descriptor) => {
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

              return {
                body,
                params,
                queries,
              };
            })(),
          );

          for (const paramDecorator of combinedInputParameterDecorators) {
            paramDecorator(target, propertyKey, parameterIndex);
          }
        }
      }
    });
  }

  HandleOperationMetadata(context: DecorateMethodContext) {
    const { operation } = context;

    context.Add(
      ApiOperation({
        description: operation.description,
        operationId: camelCase(operation.name),
      }),
    );

    context.Add(ApiBearerAuth());
  }

  Build(context: DecorateMethodContext) {
    this.HandleOperationMetadata(context);
    this.HandleInput(context);
    this.HandleOutput(context);
  }
}
