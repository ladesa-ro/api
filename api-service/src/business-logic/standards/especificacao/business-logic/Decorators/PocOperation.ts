import { SwaggerSpecDecorateHandler } from "@/business-logic/standards/especificacao/business-logic/Decorators/Operation/Adapters/Swagger/SwaggerSpecDecorateHandler";
import { SpecDecorate } from "@/business-logic/standards/especificacao/business-logic/Decorators/Operation/Core/SpecDecorate";
import { getSpecNodesStore } from "@/business-logic/standards/especificacao/business-logic/SpecNodesStore";

const operationDecoratorsManager = new SpecDecorate(getSpecNodesStore());

operationDecoratorsManager.AddHandler(new SwaggerSpecDecorateHandler());

export const PocOperation = (token: string): MethodDecorator => {
  return operationDecoratorsManager.DecorateOperation(token);
};
