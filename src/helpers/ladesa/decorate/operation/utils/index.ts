import { CheckTypeFile, CheckView } from '@unispec/ast-builder';
import type { IUniNode, IUniNodeOperation } from '@unispec/ast-types';
import type { UniRepository } from '@unispec/ast-utils';
import { CompileNodeSwaggerType, NestImpl } from '@unispec/driver-nestjs';
import { getLadesaNodesRepository } from '../../../providers';

const dtoClassesMap = new Map<string, object>();

const SetupCompilers = () => {
  const repository = getLadesaNodesRepository();
  const classCompiler = new NestImpl(repository, dtoClassesMap);

  const swaggerTypeCompiler = new CompileNodeSwaggerType(repository, classCompiler)

  return { repository, classCompiler, swaggerTypeCompiler };
};

export const { repository, classCompiler, swaggerTypeCompiler } = SetupCompilers();

export const BuildDtoCtor = (opaqueTarget: string | IUniNode, meta?: Record<string, any> | undefined) => {
  const targetRealNode = repository.GetRealTarget(opaqueTarget);

  if (targetRealNode && CheckView(targetRealNode)) {
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
  readonly repository: Readonly<UniRepository>;
  readonly operation: Readonly<IUniNodeOperation>;

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
