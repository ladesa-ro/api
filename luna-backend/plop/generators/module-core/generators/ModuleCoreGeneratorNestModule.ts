import { builders as b, namedTypes as n } from 'ast-types';
import { castArray } from 'lodash';
import { ProxifiedModule, generateCode, parseModule } from 'magicast';
import { Promisable } from 'type-fest';
import { addImportMember, findNestJsModuleObjectConfigProperty } from '../../../helpers/ts-ast/ts-ast';

export type IModuleDeclarationProperty = 'controllers' | 'exports' | 'imports' | 'providers';

export enum ModuleDeclarationProperty {
  CONTROLLERS = 'controllers',
  EXPORTS = 'exports',
  IMPORTS = 'imports',
  PROVIDERS = 'providers',
}

export type IModuleDeclareClass = {
  classImportName: string;
  classImportPath: string;
  declareInModuleProperty: (IModuleDeclarationProperty | ModuleDeclarationProperty) | (IModuleDeclarationProperty | ModuleDeclarationProperty)[];
};

export class ModuleCoreGeneratorNestModule {
  #modifyModuleQueue: ((mod: ProxifiedModule<any>) => Promisable<void>)[] = [];

  addModify(callback: (mod: ProxifiedModule<any>) => Promisable<void>) {
    this.#modifyModuleQueue.push(callback);
  }

  addImportMember(path: string | null, member: string) {
    if (path) {
      this.addModify((mod) => addImportMember(mod, path, member));
    }
  }

  addItemToModule(moduleDeclarationProperty: IModuleDeclarationProperty | ModuleDeclarationProperty, importMember: string, importPath: string | null = null) {
    this.addModify(async (mod) => {
      if (importPath) {
        this.addImportMember(importPath, importMember);
      }

      const property = await findNestJsModuleObjectConfigProperty(mod.$ast, moduleDeclarationProperty);

      if (property) {
        if (n.ArrayExpression.assert(property.value)) {
          property.value.elements.push(b.identifier(importMember));
        }
      }
    });
  }

  get isDirty() {
    return this.#modifyModuleQueue.length > 0;
  }

  appendModuleConfig(moduleDeclareClass: IModuleDeclareClass) {
    for (const property of castArray(moduleDeclareClass.declareInModuleProperty)) {
      this.addItemToModule(property, moduleDeclareClass.classImportName, moduleDeclareClass.classImportPath);
    }
  }

  async transform(fileModuleContent: string) {
    const mod = parseModule(fileModuleContent);

    for (const modifyModule of this.#modifyModuleQueue) {
      await modifyModule(mod);
    }

    return generateCode(mod).code;
  }
}
