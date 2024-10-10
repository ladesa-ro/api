import type { NodePlopAPI } from "plop";
import { ModuleCoreGenerator } from "./module-core/module-core.generator";

export const Generators = (plop: NodePlopAPI) => {
  plop.setGenerator("module-core", ModuleCoreGenerator);

  return plop;
};
