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
            name: `src/application/business/${parentPrefix}${nameKebab}/${nameKebab}.service.ts`,
            value: 'service',
          },
          {
            name: `src/application/business/${parentPrefix}${nameKebab}/${nameKebab}.controller.ts`,
            value: 'controller',
          },
          {
            name: `src/application/business/${parentPrefix}${nameKebab}/${nameKebab}.resolver.ts`,
            value: 'resolver',
          },
        ],
      },
    ]);

    const generalResources = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'recursos',
        message: 'Recursos gerais para incluir.',
        choices: [
          new inquirer.Separator(' = INTERFACES = '),
          {
            name: `[ifc] application/bussiness/(dtos)/${parentPrefix}${nameKebab}/I${namePascal}Model.ts`,
            short: `I${namePascal}Model.ts`,
            value: 'ifc-model',
          },

          new inquirer.Separator(' = DATABASE = '),

          {
            name: `[db] typeorm/entities/${parentPrefix}${nameKebab}.entity.ts`,
            short: `${namePascal}Entity.ts`,
            value: 'db-entity',
          },

          {
            name: `[db] typeorm/repositories/${parentPrefix}${nameKebab}.repository.ts`,
            short: `${nameKebab}.repository.ts`,
            value: 'db-repository',
          },

          {
            name: `[db] typeorm/migrations/${timestamp}-${parentKebab}-create-table-${nameKebab}.ts`,
            short: `${timestamp}-${parentKebab}-create-table-${nameKebab}.ts`,
            value: 'db-migration-create-table',
          },

          {
            name: `[db] DatabaseContext#${nameCamel}Repository`,
            short: `DatabaseContext#${nameCamel}Repository`,
            value: 'db-database-context',
          },
        ],
      },
    ]);

    const actions = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'recursos',
        message: 'Ações para incluir.',
        choices: [
          new inquirer.Separator(' = INPUT = '),

          {
            name: `[ifc] application/bussiness/(dtos)/${parentPrefix}${nameKebab}/${nameKebab}-input/I${namePascal}InputDto.ts`,
            short: `${namePascal}-input/I${namePascal}InputDto.ts`,
            value: 'ifc-input',
          },

          {
            name: `[dto] application/bussiness/${parentPrefix}${nameKebab}/dtos/${nameKebab}-input.dto.ts`,
            short: `dtos/${nameKebab}-input.dto.ts`,
            value: 'dto-input',
          },

          new inquirer.Separator(' = INPUT / CREATE = '),

          {
            name: `[ifc] application/bussiness/(dtos)/${parentPrefix}${nameKebab}/${nameKebab}-input/I${namePascal}CreateDto.ts`,
            short: `${namePascal}-input/I${namePascal}CreateDto.ts`,
            value: 'ifc-create',
          },

          new inquirer.Separator(' = INPUT / UPDATE = '),

          {
            name: `[ifc] application/bussiness/(dtos)/${parentPrefix}${nameKebab}/${nameKebab}-input/I${namePascal}Update.ts`,
            short: `${namePascal}-input/I${namePascal}Update.ts`,
            value: 'ifc-update',
          },

          {
            name: `[dto] application/bussiness/${parentPrefix}${nameKebab}/dtos/${nameKebab}-update.input.dto.ts`,
            short: `dtos/${namePascal}-update.input.dto.ts`,
            value: 'dto-update',
          },

          new inquirer.Separator(' = FIND ONE = '),

          {
            name: `[dto] application/bussiness/${parentPrefix}${nameKebab}/dtos/${nameKebab}-find-one.result.dto.ts`,
            short: `dtos/${namePascal}-find-one.result.dto.ts`,
            value: 'dto-find-one-result',
          },

          {
            name: `[ifc] application/bussiness/(dtos)/${parentPrefix}${nameKebab}/${nameKebab}-find-one/I${namePascal}FindOneResultDto.ts`,
            short: `${namePascal}-find-one/I${namePascal}FindOneResultDto.ts`,
            value: 'ifc-find-one-result',
          },

          new inquirer.Separator(' = FIND ONE BY ID = '),

          {
            name: `[dto] application/bussiness/${parentPrefix}${nameKebab}/dtos/${nameKebab}-find-one-by-id.input.dto.ts`,
            short: `dtos/${namePascal}-find-one-by-id.input.dto.ts`,
            value: 'dto-find-one-by-id-input',
          },

          {
            name: `[ifc] application/bussiness/(dtos)/${parentPrefix}${nameKebab}/${nameKebab}-find-one/I${namePascal}FindOneByIdInputDto.ts`,
            short: `${namePascal}-find-one/I${namePascal}FindOneByIdInputDto.ts`,
            value: 'ifc-find-one-by-id-input',
          },

          new inquirer.Separator(' = DELETE = '),

          {
            name: `[ifc] application/bussiness/(dtos)/${parentPrefix}${nameKebab}/${nameKebab}-delete/I${namePascal}DeleteOneByIdInputDtoDto.ts`,
            short: `${namePascal}-delete/I${namePascal}DeleteOneByIdInputDtoDto.ts`,
            value: 'ifc-delete-one-by-id-input',
          },

          {
            name: `[dto] application/bussiness/${parentPrefix}${nameKebab}/dtos/${nameKebab}-delete-one-by-id.input.dto.ts`,
            short: `dtos/${namePascal}-delete-one-by-id.input.dto.ts`,
            value: 'dto-delete-one-by-id-input',
          },
        ],
      },
    ]);

    return {
      ...awsGeneral,
      ...moduleStructure,
      ...generalResources,
      ...actions,
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
