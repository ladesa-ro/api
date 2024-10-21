import { IDtoCompiler } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/DtoCompiler";
import { SpecNodesStoreFromNpmPackage } from "@/business-logic/standards/especificacao/business-logic/SpecNodesStore";

export type IDtoCompilerContext = {
  mode: "output" | "input" | "core";
  nodesStore: SpecNodesStoreFromNpmPackage;
  dtoCompiler: IDtoCompiler;
};
