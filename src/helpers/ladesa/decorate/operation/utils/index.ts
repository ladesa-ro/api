import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { CheckTypeFile, CheckTypeObject, CheckView } from '@unispec/ast-builder';
import type { IUniNode, IUniNodeOperation } from '@unispec/ast-types';
import type { UniRepository } from '@unispec/ast-utils';
import { CompileClassDto } from '@unispec/driver-nestjs';
import { CompileClassHandlerGraphQlDto, CompileNodeGraphQlRepresentation } from '@unispec/driver-nestjs-graphql';
import { CompileClassHandlerSwaggerDto, CompileNodeSwaggerRepresentation } from '@unispec/driver-nestjs-swagger';
import { CompileYupSchema } from '../../../-helpers/CompileYupSchema';
import { ValidationPipeYup } from '../../../../../validacao';
import { getLadesaNodesRepository } from '../../../providers';
import { COMBINED_INPUT_PARAM } from '../CombinedInput';
import { InputCombinerGraphQl } from '../IntegrationGraphQl/InputCombinerGraphQl';

const dtoClassesMap = new Map<string, object>();

const SetupCompilers = () => {
  const repository = getLadesaNodesRepository();

  const classCompiler = new CompileClassDto(repository, [new CompileClassHandlerGraphQlDto(), new CompileClassHandlerSwaggerDto()], dtoClassesMap);

  const graphQlRepresentationCompiler = new CompileNodeGraphQlRepresentation(repository, classCompiler);
  const swaggerRepresentationCompiler = new CompileNodeSwaggerRepresentation(repository, classCompiler);

  return { repository, classCompiler, graphQlRepresentationCompiler, swaggerRepresentationCompiler };
};

export const { repository, classCompiler, graphQlRepresentationCompiler, swaggerRepresentationCompiler } = SetupCompilers();

const ResolveGraphQlTargetView = (repository: UniRepository, cursor: IUniNode | string) => {
  let targetNode: IUniNode | string | null = repository.GetRealTarget(cursor);

  if (CheckView(targetNode) && CheckTypeObject(targetNode.type)) {
    const fullReferenced = targetNode.type.partialOf ? repository.GetRealTarget(targetNode.type.partialOf) : null;

    if (fullReferenced && CheckView(fullReferenced)) {
      targetNode = fullReferenced;
    }
  }

  if (targetNode) {
    return targetNode;
  } else {
    console.log({ cursor, targetNode });

    throw new TypeError('Cannot resolve graphql target view.');
  }
};

export const BuildGraphQlRepresentation = (targetCursor: string | IUniNode, meta?: Record<string, any> | undefined) => {
  const target = ResolveGraphQlTargetView(graphQlRepresentationCompiler.repository, targetCursor);

  if (target) {
    return graphQlRepresentationCompiler.Handle(target, meta);
  } else {
    throw new TypeError();
  }
};

export const BuildSwaggerRepresentation = (opaqueTarget: string | IUniNode, meta?: Record<string, any> | undefined) => {
  const targetRealNode = repository.GetRealTarget(opaqueTarget);

  if (targetRealNode) {
    const representationCompiler = new CompileNodeSwaggerRepresentation(repository, classCompiler);

    const representation = representationCompiler.Handle(targetRealNode, meta);

    if (!CheckView(targetRealNode)) {
      return {
        schema: {
          ...representation,
        },
      };
    }

    return representation;
  } else {
    throw new TypeError();
  }
};

export const BuildDtoCtor = (opaqueTarget: string | IUniNode, meta?: Record<string, any> | undefined) => {
  const targetRealNode = repository.GetRealTarget(opaqueTarget);

  if (targetRealNode) {
    return classCompiler.CompileCtor(targetRealNode, null, meta);
  } else {
    throw new TypeError();
  }
};

export const detectStrategy = (node: any) => {
  if (node && CheckTypeFile(node)) {
    return 'file';
  }

  return 'dto';
};

export type DecorateMethodContext = {
  readonly repository: UniRepository;
  readonly operation: IUniNodeOperation;

  decorators: Array<MethodDecorator>;
  combinedInputParameterDecorators: Array<ParameterDecorator>;

  Add(decorator: MethodDecorator): DecorateMethodContext;
  CombinedInputAdd(decorator: ParameterDecorator): DecorateMethodContext;
};

export abstract class AbstractOperationDecoratorsHandler {
  abstract Build(context: DecorateMethodContext): void;
}

export class OperationDecoratorsBuilder {
  #handlers: AbstractOperationDecoratorsHandler[] = [];

  AddHandlers(handlers: Iterable<AbstractOperationDecoratorsHandler>) {
    for (const handler of handlers) {
      this.#handlers.push(handler);
    }
  }

  constructor(handlers: Iterable<AbstractOperationDecoratorsHandler> = []) {
    this.AddHandlers(handlers);
  }

  Build(operation: IUniNodeOperation, repository: UniRepository) {
    const context: DecorateMethodContext = {
      operation,
      repository,
      decorators: [],
      combinedInputParameterDecorators: [],
      Add(decorator) {
        context.decorators.push(decorator);
        return context;
      },
      CombinedInputAdd(decorator) {
        context.combinedInputParameterDecorators.push(decorator);
        return context;
      },
    };

    for (const handler of this.#handlers) {
      handler.Build(context);
    }

    if (context.operation.input) {
      const compileYupSchema = new CompileYupSchema(context.repository);
      const combinedInputValidator = compileYupSchema.Handle(operation, context);

      context.Add((target, propertyKey, descriptor) => {
        if (descriptor.value) {
          const combinedInputParam = Reflect.getMetadata(COMBINED_INPUT_PARAM, descriptor.value);

          if (combinedInputParam) {
            const { parameterIndex } = combinedInputParam;

            context.CombinedInputAdd(
              createParamDecorator((_, executionContext: ExecutionContextHost) => {
                if (executionContext.getType<string>() === 'graphql') {
                  const [, input] = executionContext.getArgs();
                  return InputCombinerGraphQl.DecombineInput(operation, input);
                } else {
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
                }
              })(null, new ValidationPipeYup(combinedInputValidator)),
            );

            for (const paramDecorator of context.combinedInputParameterDecorators) {
              paramDecorator(target, propertyKey, parameterIndex);
            }
          }
        }
      });
    }

    return context.decorators;
  }
}
