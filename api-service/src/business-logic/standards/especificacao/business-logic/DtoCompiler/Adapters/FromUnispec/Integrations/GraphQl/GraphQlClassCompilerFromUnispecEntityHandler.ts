import {
  GenericClassCompilerFromUnispecEntityHandler,
  IGenericClassCompilerFromUnispecEntityTypings,
} from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/Core/GenericClassCompilerFromUnispecEntity";
import { ICompileClassContext, ICompileClassPropertyContext } from "@/business-logic/standards/especificacao/infrastructure/utils/class-compiler";

export class GraphQlClassCompilerFromUnispecEntityHandler extends GenericClassCompilerFromUnispecEntityHandler {
  HandleClass(classContext: ICompileClassContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}

  HandleClassProperty(classPropertyContext: ICompileClassPropertyContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}
}
