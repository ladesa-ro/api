import { namedTypes as n } from "ast-types";
import { parseModule } from "magicast";
import { ChangeCaseHelper } from "../../../helpers";
import { BaseModuleCoreGenerator } from "./BaseModuleCoreGenerator";

export class ModuleCoreGeneratorDatabaseContextCore extends BaseModuleCoreGenerator {
  addRepository(
    moduleName: string,
    accessorName: string = `${ChangeCaseHelper.c_camel(moduleName)}Repository`,
    createRepositoryName: string = `create${ChangeCaseHelper.c_pascal(moduleName)}Repository`,
  ) {
    const dummyCode = `export class Dummy {
      get ${accessorName}() {
        return repositories.${createRepositoryName}(this.ds);
      }
    }`;

    const dummyMod = parseModule(dummyCode);
    const property: n.ClassMethod = (dummyMod.$ast as any).body[0].declaration.body.body[0];

    this.addModifyAcessor("DatabaseContextCore", accessorName, property);

    return this;
  }
}
