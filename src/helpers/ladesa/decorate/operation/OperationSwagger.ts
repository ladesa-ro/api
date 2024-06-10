import { Param as HttpParam, Query as HttpQuery, UseInterceptors, createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiProduces, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CheckType, CheckTypeFile } from '@unispec/ast-builder';
import { camelCase } from 'lodash';
import { CompileYupSchema } from '../../-helpers/CompileYupSchema';
import { ValidationPipeYup } from '../../../../validacao';
import { COMBINED_INPUT_PARAM } from './CombinedInput';
import { AbstractOperationDecoratorsHandler, BuildSwaggerRepresentation, DecorateMethodContext, detectStrategy, swaggerRepresentationCompiler } from './utils';

export type IHandleInputContext = DecorateMethodContext & {
  combinedInputParameterDecorators: ParameterDecorator[];
};

export class OperationDecoratorsHandlerSwagger extends AbstractOperationDecoratorsHandler {
  Build(context: DecorateMethodContext) {
    this.HandleMetadata(context);
    this.HandleInputs(context);
    this.HandleResponses(context);
  }

  HandleMetadata(context: DecorateMethodContext) {
    const { operation } = context;

    context.Add(
      ApiOperation({
        description: operation.description,
        operationId: camelCase(operation.name),
      }),
    );

    context.Add(ApiBearerAuth());
  }

  HandleResponses(context: DecorateMethodContext) {
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
            const swaggerRepresentation = resultNode && BuildSwaggerRepresentation(resultNode, { mode: 'output' });

            const description = `Resposta da operação "${operation.name}".`;

            context.Add(
              ApiResponse({
                status,
                ...swaggerRepresentation,
                description: description,
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

    this.HandleResponseForbidden(context);
    this.HandleResponseNotFound(context);
  }

  HandleResponseForbidden(context: DecorateMethodContext) {
    context.Add(
      ApiResponse({
        status: 403,
        description: 'O solicitante não tem permissão para executar esta ação.',
      }),
    );
  }

  HandleResponseNotFound(context: DecorateMethodContext) {
    context.Add(
      ApiResponse({
        status: 404,
        description: 'Registro não encontrado.',
      }),
    );
  }

  HandleInputs(context: DecorateMethodContext) {
    const { operation, repository } = context;

    const handleInputContext: IHandleInputContext = {
      ...context,
      combinedInputParameterDecorators: [],
    };

    this.HandleInputParams(handleInputContext);
    this.HandleInputQueries(handleInputContext);

    const input = operation.input;

    if (input) {
      const inputBody = input.body;
      const inputBodyTarget = inputBody ? repository.GetRealTarget(inputBody) : null;

      switch (detectStrategy(inputBodyTarget)) {
        case 'file': {
          this.HandleInputBodyFile(context);
          break;
        }

        case 'dto': {
          this.HandleInputBodyDto(context);
          break;
        }

        default: {
          throw new TypeError('Unsupported operation.input.strategy.');
        }
      }
    }

    const compileYupSchema = new CompileYupSchema(context.repository);

    const combinedInputValidator = compileYupSchema.Handle(operation);

    context.Add((target, propertyKey, descriptor) => {
      if (descriptor.value) {
        const combinedInputParam = Reflect.getMetadata(COMBINED_INPUT_PARAM, descriptor.value);

        if (combinedInputParam) {
          const { parameterIndex } = combinedInputParam;

          handleInputContext.combinedInputParameterDecorators.push(
            createParamDecorator((_, executionContext: ExecutionContextHost) => {
              const httpContext = executionContext.switchToHttp();

              const request = httpContext.getRequest();

              const body = request.body;
              const params = request.params;
              const queries = request.query;

              return {
                body,
                params,
                queries,
              };
            })(null, new ValidationPipeYup(combinedInputValidator, { path: null, scope: 'args' })),
          );

          for (const paramDecorator of handleInputContext.combinedInputParameterDecorators) {
            paramDecorator(target, propertyKey, parameterIndex);
          }
        }
      }
    });
  }

  HandleInputParams(context: IHandleInputContext) {
    const { operation, repository } = context;

    const input = operation.input;

    if (!input) {
      return;
    }

    for (const [key, opaqueTargetNode] of Object.entries(input.params ?? {})) {
      const name = key;

      const realTargetNode = repository.GetRealTarget(opaqueTargetNode);

      if (CheckType(realTargetNode)) {
        context.Add(
          ApiParam({
            ...swaggerRepresentationCompiler.Handle(realTargetNode),
            name: name,
            required: realTargetNode.required,
            description: realTargetNode.description,
          }),
        );

        context.combinedInputParameterDecorators.push(HttpParam(name));
      } else {
        throw new TypeError(`Invalid param real target: ${name}.`);
      }
    }
  }
  HandleInputQueries(context: IHandleInputContext) {
    const { operation, repository } = context;

    const input = operation.input;

    if (!input) {
      return;
    }

    for (const [key, opaqueTargetNode] of Object.entries(input.queries ?? {})) {
      const name = key;

      const realTargetNode = repository.GetRealTarget(opaqueTargetNode);

      if (CheckType(realTargetNode)) {
        context.Add(
          ApiQuery({
            ...swaggerRepresentationCompiler.Handle(realTargetNode),
            name: name,
            required: realTargetNode.required,
            description: realTargetNode.description,
          }),
        );

        context.combinedInputParameterDecorators.push(HttpQuery(name));
      } else {
        throw new TypeError(`Invalid query real target: ${name}.`);
      }
    }
  }

  HandleInputBodyDto(context: DecorateMethodContext) {
    const { operation, repository } = context;
    const input = operation.input;

    const inputBody = input?.body;
    const inputBodyTarget = inputBody ? repository.GetRealTarget(inputBody) : null;

    const swaggerRepresentation = inputBodyTarget && BuildSwaggerRepresentation(inputBodyTarget, { mode: 'input' });

    if (swaggerRepresentation) {
      context.Add(ApiBody({ ...swaggerRepresentation }));
    }
  }

  HandleInputBodyFile(context: DecorateMethodContext) {
    context.Add(ApiConsumes('multipart/form-data'));

    context.Add(
      ApiBody({
        schema: {
          type: 'object',
          required: ['file'],
          properties: {
            file: { type: 'string', format: 'binary', nullable: false },
          },
        },
      }),
    );

    context.Add(UseInterceptors(FileInterceptor('file')));
  }
}
