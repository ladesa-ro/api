import {
  GenericClassCompilerFromUnispecEntityHandler,
  IGenericClassCompilerFromUnispecEntityTypings,
} from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Core/GenericClassCompilerFromUnispecEntity";
import { SwaggerNodeCompiler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Integrations/Swagger/SwaggerNodeCompiler";
import { IDtoCompiler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/DtoCompiler";
import { INodeTypeObjectEntity } from "@/business-logic/standards/especificacao/infrastructure";
import { ICompileClassContext, ICompileClassPropertyContext } from "@/business-logic/standards/especificacao/infrastructure/utils/class-compiler";
import { ApiProperty } from "@nestjs/swagger";

export class SwaggerClassCompilerFromUnispecEntityHandler extends GenericClassCompilerFromUnispecEntityHandler {
  public swaggerNodeCompiler = new SwaggerNodeCompiler();

  HandleClass(classContext: ICompileClassContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}

  HandleClassProperty(classPropertyContext: ICompileClassPropertyContext<IGenericClassCompilerFromUnispecEntityTypings>): void {
    const dtoCompiler = classPropertyContext.classContext.classCompiler as IDtoCompiler;

    const dtoCompilerContext = dtoCompiler.GetContext("core");

    const node: INodeTypeObjectEntity = classPropertyContext.classContext.node;

    const swaggerType = this.swaggerNodeCompiler.Handle(classPropertyContext.propertyNode, dtoCompilerContext);

    const required = node.required?.includes(classPropertyContext.propertyKey) ?? false;

    classPropertyContext.AddDecoratorToCurrentProperty(
      ApiProperty({
        required: required,
        name: classPropertyContext.propertyKey,
        ...swaggerType,
      }),
    );
  }
}
