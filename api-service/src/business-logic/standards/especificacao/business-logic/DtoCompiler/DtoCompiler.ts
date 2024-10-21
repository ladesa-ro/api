import { GenericClassCompilerFromUnispecEntity } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/core/generic-class-compiler-from-unispec-entity";
import { GraphQlClassCompilerFromUnispecEntityHandler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/integrations/graphql/graphql-class-compiler-from-unispec-entity-handler";
import { SwaggerClassCompilerFromUnispecEntityHandler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/integrations/swagger/swagger-class-compiler-from-unispec-entity-handler";
import { CheckType, INode, NodeTypeObjectEntity } from "@/business-logic/standards/especificacao/infrastructure";
import * as valibot from "valibot";

export class DtoCompiler extends GenericClassCompilerFromUnispecEntity {
  constructor() {
    super();

    this.AddHandler(new SwaggerClassCompilerFromUnispecEntityHandler());
    this.AddHandler(new GraphQlClassCompilerFromUnispecEntityHandler());
  }

  CompileClass(node: INode, classesMap?: Map<string, any>) {
    if (!CheckType(NodeTypeObjectEntity, node)) {
      const output = valibot.safeParse(NodeTypeObjectEntity, node);
      console.debug(output.issues);
      console.debug(node);
      debugger;

      throw new Error("You must provide a NodeTypeObjectEntity to DtoCompiler#CompileClass");
    }

    return super.CompileClass(node, classesMap);
  }
}

export const dtoCompiler = new DtoCompiler();
