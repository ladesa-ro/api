import {
  GenericClassCompilerFromUnispecEntityHandler,
  IGenericClassCompilerFromUnispecEntityTypings,
} from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/Adapters/FromUnispec/core/generic-class-compiler-from-unispec-entity";
import { ICompileClassContext, ICompileClassPropertyContext } from "@/business-logic/standards/especificacao/infrastructure/utils/class-compiler";

export class SwaggerClassCompilerFromUnispecEntityHandler extends GenericClassCompilerFromUnispecEntityHandler {
  HandleClass(classContext: ICompileClassContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}

  HandleClassProperty(classPropertyContext: ICompileClassPropertyContext<IGenericClassCompilerFromUnispecEntityTypings>): void {}
}
