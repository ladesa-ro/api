export type IPropertyKey = string | number | symbol | any;

export type IClassCompilerTypings<Node = any, PropertyNode = any> = {
  node: Node;
  propertyNode: PropertyNode;
};

export type IClassCompilerTypingsInferNode<ClassCompilerTypings extends IClassCompilerTypings<any, any>> = ClassCompilerTypings extends IClassCompilerTypings<infer Node> ? Node : never;

export type IClassCompilerTypingsInferPropertyNode<ClassCompilerTypings extends IClassCompilerTypings<any, any>> = ClassCompilerTypings extends IClassCompilerTypings<any, infer PropertyNode>
  ? PropertyNode
  : never;

export type ICompileClassContext<ClassCompilerTypings extends IClassCompilerTypings> = {
  node: IClassCompilerTypingsInferNode<ClassCompilerTypings>;

  classCompiler: IClassCompiler<ClassCompilerTypings>;
  classesMap: Map<string, any>;

  classDecorators: unknown[];
  classPropertiesDecorators: Map<PropertyKey, unknown[]>;
};

export type ICompileClassPropertyContext<ClassCompilerTypings extends IClassCompilerTypings> = {
  classContext: ICompileClassContext<ClassCompilerTypings>;

  propertyKey: IPropertyKey;
  propertyNode: IClassCompilerTypingsInferPropertyNode<ClassCompilerTypings>;
};

export interface IClassCompilerHandler<ClassCompilerTypings extends IClassCompilerTypings> {
  HandleClass(classContext: ICompileClassContext<ClassCompilerTypings>): void;

  HandleClassProperty(classPropertyContext: ICompileClassPropertyContext<ClassCompilerTypings>): void;
}

export interface IClassCompilerCtor<ClassCompilerTypings extends IClassCompilerTypings> {
  new (handlers?: Iterable<IClassCompilerHandler<ClassCompilerTypings>>): IClassCompiler<ClassCompilerTypings>;
}

export type INodeProperty<ClassCompilerTypings extends IClassCompilerTypings> = {
  propertyKey: IPropertyKey;
  propertyNode: IClassCompilerTypingsInferPropertyNode<ClassCompilerTypings>;
};

export interface IClassCompiler<ClassCompilerTypings extends IClassCompilerTypings> {
  AddHandler(handler?: IClassCompilerHandler<ClassCompilerTypings>): this;
  AddHandlers(handlers?: Iterable<IClassCompilerHandler<ClassCompilerTypings>>): this;

  GetHandlers(): Iterable<IClassCompilerHandler<ClassCompilerTypings>>;

  GetNodeIdentifier(classContext: ICompileClassContext<ClassCompilerTypings>): string;

  GetNodeProperties(classContext: ICompileClassContext<ClassCompilerTypings>): Iterable<INodeProperty<ClassCompilerTypings>>;

  CompileClass(node: IClassCompilerTypingsInferNode<ClassCompilerTypings>, classesMap: Map<string, any>): unknown;

  CompileClassHandler(classContext: ICompileClassContext<ClassCompilerTypings>): void;

  CompileClassHandleProperties(classContext: ICompileClassContext<ClassCompilerTypings>): void;

  CompileClassHandleProperty(classPropertyContext: ICompileClassPropertyContext<ClassCompilerTypings>): void;
}
