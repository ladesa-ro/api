import { builders as b, namedTypes as n } from "ast-types";
import { castArray } from "lodash";
import { findNestJsModuleObjectConfigProperty } from "../../../helpers/ts-ast/ts-ast";
import { BaseModuleCoreGenerator } from "./BaseModuleCoreGenerator";

export type IModuleDeclarationProperty = "controllers" | "exports" | "imports" | "providers";

export enum ModuleDeclarationProperty {
  CONTROLLERS = "controllers",
  EXPORTS = "exports",
  IMPORTS = "imports",
  PROVIDERS = "providers",
}

export type IModuleDeclareClass = {
  classImportName: string;
  classImportPath: string;
  declareInModuleProperty: (IModuleDeclarationProperty | ModuleDeclarationProperty) | (IModuleDeclarationProperty | ModuleDeclarationProperty)[];
};

export class ModuleCoreGeneratorNestModule extends BaseModuleCoreGenerator {
  addItemToModule(moduleDeclarationProperty: IModuleDeclarationProperty | ModuleDeclarationProperty, importMember: string, importPath: string | null = null) {
    this.addModify(async (mod) => {
      if (importPath) {
        this.addImportMember(importPath, importMember);
      }

      const property = await findNestJsModuleObjectConfigProperty(mod.$ast, moduleDeclarationProperty);

      if (property) {
        if (n.ArrayExpression.assert(property.value)) {
          const alreadyDeclared = property.value.elements.some((i) => {
            if (i?.type === "Identifier") {
              return i.name === importMember;
            }

            return false;
          });

          if (!alreadyDeclared) {
            property.value.elements.push(b.identifier(importMember));
          }
        }
      }
    });
  }

  appendModuleConfig(moduleDeclareClass: IModuleDeclareClass) {
    for (const property of castArray(moduleDeclareClass.declareInModuleProperty)) {
      this.addItemToModule(property, moduleDeclareClass.classImportName, moduleDeclareClass.classImportPath);
    }

    return this;
  }
}
