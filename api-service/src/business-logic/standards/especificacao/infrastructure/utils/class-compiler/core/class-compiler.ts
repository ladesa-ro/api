import {
  IClassCompiler,
  IClassCompilerHandler,
  IClassCompilerTypings,
  IClassCompilerTypingsInferNode,
  ICompileClassContext,
  ICompileClassPropertyContext,
  INodeProperty,
  IPropertyKey,
} from "@/business-logic/standards/especificacao/infrastructure/utils/class-compiler/typings/core";
import { __decorate } from "tslib";

const CreateEmptyClassWithName = (name: string) => {
  return {
    [name]: class {},
  }[name];
};

export abstract class ClassCompiler<ClassCompilerTypings extends IClassCompilerTypings<any, any>> implements IClassCompiler<ClassCompilerTypings> {
  #handlers = new Set<IClassCompilerHandler<ClassCompilerTypings>>();

  *GetHandlers(): Iterable<IClassCompilerHandler<ClassCompilerTypings>> {
    yield* this.#handlers;
  }

  AddHandler(handler?: IClassCompilerHandler<ClassCompilerTypings>) {
    if (handler) {
      this.#handlers.add(handler);
    }
    return this;
  }

  AddHandlers(handlers?: Iterable<IClassCompilerHandler<ClassCompilerTypings>>) {
    if (handlers) {
      for (const handler of handlers) {
        this.AddHandler(handler);
      }
    }

    return this;
  }

  constructor(handlers?: Iterable<IClassCompilerHandler<ClassCompilerTypings>>) {
    this.AddHandlers(handlers);
  }

  CompileClass(node: IClassCompilerTypingsInferNode<ClassCompilerTypings>, classesMap: Map<string, any> = new Map()) {
    //
    const classContext = {
      node,
      classesMap,
      classCompiler: this,

      classDecorators: [],
      classPropertiesDecorators: new Map<IPropertyKey, []>(),
    } satisfies ICompileClassContext<ClassCompilerTypings>;

    const identifier = this.GetNodeIdentifier(classContext);

    if (classContext.classesMap.has(identifier)) {
      return classContext.classesMap.get(identifier);
    }

    const CompiledClass = CreateEmptyClassWithName(identifier);

    classContext.classesMap.set(identifier, CompiledClass);

    this.CompileClassHandler(classContext);
    this.CompileClassHandleProperties(classContext);

    __decorate(classContext.classDecorators, CompiledClass);

    for (const [propertyKey, propertyDecorators] of classContext.classPropertiesDecorators.entries()) {
      __decorate(propertyDecorators, CompiledClass, propertyKey);
    }

    return CompiledClass;
  }

  CompileClassHandler(classContext: ICompileClassContext<ClassCompilerTypings>): void {
    for (const handler of this.GetHandlers()) {
      handler.HandleClass(classContext);
    }
  }

  CompileClassHandleProperties(classContext: ICompileClassContext<ClassCompilerTypings>): void {
    for (const nodeProperty of this.GetNodeProperties(classContext)) {
      const classPropertyContext = {
        classContext: classContext,
        propertyKey: nodeProperty.propertyKey,
        propertyNode: nodeProperty.propertyNode,
      } satisfies ICompileClassPropertyContext<ClassCompilerTypings>;

      this.CompileClassHandleProperty(classPropertyContext);
    }
  }

  CompileClassHandleProperty(classPropertyContext: ICompileClassPropertyContext<ClassCompilerTypings>) {
    for (const handler of this.GetHandlers()) {
      handler.HandleClassProperty(classPropertyContext);
    }
  }

  abstract GetNodeProperties(context: ICompileClassContext<ClassCompilerTypings>): Iterable<INodeProperty<ClassCompilerTypings>>;

  abstract GetNodeIdentifier(classContext: ICompileClassContext<ClassCompilerTypings>): string;
}
