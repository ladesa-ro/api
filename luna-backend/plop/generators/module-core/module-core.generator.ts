import * as ChangeCase from 'change-case';
import inq from 'inquirer';
import { PlopGeneratorConfig } from 'plop';

const timestamp = '0000000000000';

export const ModuleCoreGenerator: Partial<PlopGeneratorConfig> = {
  description: 'Módulo Genérico.',

  prompts: async (inquirer: typeof inq) => {
    const awsParent = await inquirer.prompt([
      {
        type: 'input',
        name: 'parent',
        message: 'Localização do módulo pai (dentro de src/application/business):',
      },
    ]);

    const parentKebab = ChangeCase.kebabCase(awsParent.parent);
    const parentPrefix = parentKebab?.trim() ? `${parentKebab}/` : '';

    const awsGeneral = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Nome do módulo:',
      },
    ]);

    const nameKebab = ChangeCase.kebabCase(awsGeneral.name);
    const nameCamel = ChangeCase.camelCase(awsGeneral.name);
    const namePascal = ChangeCase.pascalCase(awsGeneral.name);

    const moduleStructure = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'recursos',
        message: 'Estrutura do módulo',
        choices: [
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
          {
            name: `Incluir application/bussiness/(dtos)/${parentPrefix}${nameKebab}/I${namePascal}Model.ts`,
            short: `I${namePascal}Model.ts`,
            value: 'ifc-model',
            checked: true,
          },
        ],
      },
    ]);

    const resourcesToHandle = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'recursos',
        message: 'Ações para incluir',
        choices: [
          {
            name: `${namePascal} - Create`,
            short: `${namePascal} - Create`,
            value: 'handle-resource-create',
          },
          {
            name: `${namePascal} - Read`,
            short: `${namePascal} - Read`,
            value: 'handle-resource-read',
          },
          {
            name: `${namePascal} - Update`,
            short: `${namePascal} - Update`,
            value: 'handle-resource-update',
          },
          {
            name: `${namePascal} - Delete`,
            short: `${namePascal} - Delete`,
            value: 'handle-resource-delete',
          },
        ],
      },
    ]);

    const databaseResources = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'recursos',
        message: 'Integração ao banco de dados.',
        choices: [
          new inquirer.Separator(' = DATABASE = '),

          {
            name: `[db] Entity - entities/${parentPrefix}${nameKebab}.entity.ts`,
            short: `${namePascal}Entity.ts`,
            value: 'db-entity',
          },

          {
            name: `[db] Repository - repositories/${parentPrefix}${nameKebab}.repository.ts`,
            short: `${nameKebab}.repository.ts`,
            value: 'db-repository',
          },

          {
            name: `[db] Migration Create Table - migrations/${timestamp}-${parentKebab}-create-table-${nameKebab}.ts`,
            short: `${timestamp}-${parentKebab}-create-table-${nameKebab}.ts`,
            value: 'db-migration-create-table',
          },
        ],
      },
    ]);

    return {
      ...awsGeneral,
      ...moduleStructure,
      ...databaseResources,
      ...resourcesToHandle,
    };
  },

  actions: [
    {
      type: 'addMany',
      destination: 'src/application/business/{{ c_kebab name }}',
      base: './plop/generators/module-core/hbs',
      templateFiles: './plop/generators/module-core/hbs/**/*.hbs',
      skipIfExists: true,
    },
  ],
};
