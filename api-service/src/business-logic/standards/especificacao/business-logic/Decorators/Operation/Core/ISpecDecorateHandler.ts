import { INodeTypeObjectOperation } from "@/business-logic/standards/especificacao/infrastructure";

export interface ISpecDecorateOperationContext {
  readonly operationNode: INodeTypeObjectOperation;

  methodDecorators: MethodDecorator[];
  AddMethodDecorator(decorator: MethodDecorator): this;

  combinedInputDecorators: ParameterDecorator[];
  AddCombinedInputDecorator(decorator: ParameterDecorator): this;

  meta: {
    node: INodeTypeObjectOperation;
    operationId: string;
    description: string;
  };
}

export interface ISpecDecorateHandler {
  HandleOperation(context: ISpecDecorateOperationContext): void;
}
