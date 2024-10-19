import { dtoCompiler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/DtoCompiler";
import { especificacaoNodesStore } from "@/business-logic/standards/especificacao/business-logic/stores/nodes-store";
import { applyDecorators } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export const PocOperacaoApi = (token: string): MethodDecorator => {
  const operationNode = especificacaoNodesStore.GetOperationNode(token);

  return (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
    const decorators: MethodDecorator[] = [];

    decorators.push(
      ApiOperation({
        description: operationNode.description ?? "ai eu fico maluco",
        operationId: operationNode["x-unispec-operation-id"],
      }),
    );

    const output = operationNode.properties.output;

    if (output) {
      const success = output.properties?.success;

      if (success) {
        const successNode = especificacaoNodesStore.GetTargetNode(success);

        const compiledDto = dtoCompiler.CompileClass(successNode);

        decorators.push(
          ApiResponse({
            type: compiledDto,
          }),
        );
      }
    }

    applyDecorators(...decorators)(target, propertyKey, descriptor);
  };
};
