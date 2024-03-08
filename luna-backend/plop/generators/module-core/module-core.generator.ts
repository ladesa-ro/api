import { builders as b, namedTypes as n } from 'ast-types';
import * as ChangeCase from 'change-case';
import inq from 'inquirer';
import { ProxifiedModule, generateCode, parseModule } from 'magicast';
import { basename, dirname } from 'path';
import { ActionType, PlopGeneratorConfig } from 'plop';
import { ChangeCaseHelper } from '../../helpers';
import { findNestJsModuleObjectConfigProperty } from '../../helpers/ts-ast/ts-ast';

const timestamp = '0000000000000';

type Response = {
  modulePath: string;
  name: string;
  parent: string;

  estrutura: ('ifc-entity' | 'service' | 'controller' | 'resolver')[];
};

export const ModuleCoreGenerator: Partial<PlopGeneratorConfig> = {
  description: 'Módulo Genérico.',

  prompts: async (inquirer: typeof inq) => {
    const { modulePath } = await inquirer.prompt([
      {
        type: 'input',
        name: 'modulePath',
        message: 'Localização do módulo (dentro de src/application/business):',
        default: 'escopo/modulo',
      },
    ]);

    const name = basename(modulePath);
    const parent = basename(dirname(modulePath));

    const parentKebab = ChangeCase.kebabCase(parent);
    const parentPrefix = parentKebab?.trim() ? `${parentKebab}/` : '';

    const nameKebab = ChangeCase.kebabCase(name);
    const namePascal = ChangeCase.pascalCase(name);

    const moduleStructure = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'estrutura',
        message: 'Estrutura do módulo',
        choices: [
          {
            name: `Possui entidade`,
            short: `I${namePascal}Model.ts`,
            value: 'ifc-entity',
            checked: true,
          },
          {
            name: `Incluir ${parentPrefix}${nameKebab}/${nameKebab}.service.ts`,
            value: 'service',
            checked: true,
          },
          {
            name: `Incluir ${parentPrefix}${nameKebab}/${nameKebab}.controller.ts`,
            value: 'controller',
            checked: true,
          },
          {
            name: `Incluir ${parentPrefix}${nameKebab}/${nameKebab}.resolver.ts`,
            value: 'resolver',
            checked: true,
          },
        ],
      },
    ]);

    const operationsToHandle = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'operacoes',
        message: 'Ações para incluir',
        choices: [
          {
            name: `${namePascal} - Create`,
            short: `${namePascal} - Create`,
            value: 'handle-resource-create',
            checked: true,
          },
          {
            name: `${namePascal} - Read`,
            short: `${namePascal} - Read`,
            value: 'handle-resource-read',
            checked: true,
          },
          {
            name: `${namePascal} - Update`,
            short: `${namePascal} - Update`,
            value: 'handle-resource-update',
            checked: true,
          },
          {
            name: `${namePascal} - Delete`,
            short: `${namePascal} - Delete`,
            value: 'handle-resource-delete',
            checked: true,
          },
        ],
      },
    ]);

    const databaseResources = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'database',
        message: 'Integração ao banco de dados.',
        choices: [
          new inquirer.Separator(' = DATABASE = '),

          {
            name: `[db] Entity - entities/${parentPrefix}${nameKebab}.entity.ts`,
            short: `${namePascal}Entity.ts`,
            value: 'db-entity',
            checked: true,
          },

          {
            name: `[db] Repository - repositories/${parentPrefix}${nameKebab}.repository.ts`,
            short: `${nameKebab}.repository.ts`,
            value: 'db-repository',
            checked: true,
          },

          {
            name: `[db] Migration Create Table - migrations/${timestamp}-${parentKebab}-create-table-${nameKebab}.ts`,
            short: `${timestamp}-${parentKebab}-create-table-${nameKebab}.ts`,
            value: 'db-migration-create-table',
            checked: true,
          },
        ],
      },
    ]);

    return {
      modulePath,
      name,
      parent,
      ...moduleStructure,
      ...databaseResources,
      ...operationsToHandle,
    };
  },

  actions: (data: any) => {
    const aws = data as Response;

    // console.log(JSON.stringify(aws, null, 2));

    const actions: ActionType[] = [];

    const templateBase = `./plop/generators/module-core/hbs`;
    const hbsModuleBase = `src/application/business/{{ c_kebab parent }}/{{ c_kebab name }}`;

    actions.push({
      type: 'add',
      path: `${hbsModuleBase}/{{ c_kebab name }}.module.ts`,
      templateFile: `${templateBase}/core-module/module.ts.hbs`,
      skipIfExists: true,
    });

    const modifyModuleQueue: ((mod: ProxifiedModule<any>) => Promise<void>)[] = [];

    const addItemToModule = (moduleDeclarationProperty: string, importMember: string, importPath: string | null = null) => {
      modifyModuleQueue.push(async (mod) => {
        if (importPath) {
          mod.imports.$add({ from: importPath, imported: importMember });
        }

        const property = await findNestJsModuleObjectConfigProperty(mod.$ast, moduleDeclarationProperty);

        if (property) {
          if (n.ArrayExpression.assert(property.value)) {
            property.value.elements.push(b.identifier(importMember));
          }
        }
      });
    };

    if (aws.estrutura.includes('controller')) {
      actions.push({
        type: 'add',
        path: `${hbsModuleBase}/{{ c_kebab name }}.controller.ts`,
        templateFile: `${templateBase}/core-module/controller.ts.hbs`,
        skipIfExists: true,
      });

      const controllerName = `${ChangeCaseHelper.c_pascal(aws.name)}Controller`;
      const controllerPathRelative = `./${ChangeCaseHelper.c_kebab(aws.name)}.controller`;

      addItemToModule('controllers', controllerName, controllerPathRelative);
    }

    if (aws.estrutura.includes('service')) {
      actions.push({
        type: 'add',
        path: `${hbsModuleBase}/{{ c_kebab name }}.service.ts`,
        templateFile: `${templateBase}/core-module/service.ts.hbs`,
        skipIfExists: true,
      });

      const serviceName = `${ChangeCaseHelper.c_pascal(aws.name)}Service`;
      const servicePathRelative = `./${ChangeCaseHelper.c_kebab(aws.name)}.service`;

      addItemToModule('providers', serviceName, servicePathRelative);
      addItemToModule('exports', serviceName, null);
    }

    if (modifyModuleQueue.length > 0) {
      actions.push({
        type: 'modify',
        path: `${hbsModuleBase}/{{ c_kebab name }}.module.ts`,
        transform: async (fileModuleContent) => {
          const mod = parseModule(fileModuleContent);

          for (const modifyModule of modifyModuleQueue) {
            await modifyModule(mod);
          }

          return generateCode(mod).code;
        },
      });
    }

    return actions;
  },
};
