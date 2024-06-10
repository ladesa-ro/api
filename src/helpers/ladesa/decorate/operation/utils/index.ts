import { CheckTypeFile, CheckView } from '@unispec/ast-builder';
import type { IUniNode, IUniNodeOperation } from '@unispec/ast-types';
import type { UniRepository } from '@unispec/ast-utils';
import { CompileClassDto } from '@unispec/driver-nestjs';
import { CompileClassHandlerGraphQlDto, CompileNodeGraphQlRepresentation } from '@unispec/driver-nestjs-graphql';
import { CompileClassHandlerSwaggerDto, CompileNodeSwaggerRepresentation } from '@unispec/driver-nestjs-swagger';
import { getLadesaNodesRepository } from '../../../providers';

const dtoClassesMap = new Map<string, object>();

const SetupCompilers = () => {
  const repository = getLadesaNodesRepository();
  const classCompiler = new CompileClassDto(repository, [new CompileClassHandlerGraphQlDto(), new CompileClassHandlerSwaggerDto()], dtoClassesMap);

  const swaggerRepresentationCompiler = new CompileNodeSwaggerRepresentation(repository, classCompiler);

  return { repository, classCompiler, swaggerRepresentationCompiler };
};

export const { repository, classCompiler, swaggerRepresentationCompiler } = SetupCompilers();

export const BuildGraphQlRepresentation = (opaqueTarget: string | IUniNode, meta?: Record<string, any> | undefined) => {
  const targetRealNode = repository.GetRealTarget(opaqueTarget);

  if (targetRealNode) {
    const representationCompiler = new CompileNodeGraphQlRepresentation(repository, classCompiler);
    return representationCompiler.Handle(targetRealNode, meta);
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
        schema: { ...representation },
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

  Add(decorator: MethodDecorator): DecorateMethodContext;
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
      Add(decorator) {
        context.decorators.push(decorator);
        return context;
      },
    };

    for (const handler of this.#handlers) {
      handler.Build(context);
    }

    return context.decorators;
  }
}
