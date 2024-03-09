import * as ChangeCase from 'change-case';
import inq from 'inquirer';
import { basename, dirname } from 'path';
import { timestamp } from '../module-core.generator';

export type IAnswerEstrutura = 'model' | 'service' | 'controller' | 'resolver';

export enum Estrutura {
  MODEL = 'model',
  SERVICE = 'service',
  CONTROLLER = 'controller',
  RESOLVER = 'resolver',
}

export type IAnswerOperacao = 'handle-resource-create' | 'handle-resource-read' | 'handle-resource-update' | 'handle-resource-delete';

export type IAnswerDatabase = 'db-entity' | 'db-repository' | 'db-migration-create-table';

type IPropriedadeDeclarada = {
  nome: string;
  descricao: string;
  tipoInterface: string;
};

export type IModuleCoreAnswers = {
  modulePath: string;
  moduleName: string;
  moduleNameParent: string;

  estrutura: IAnswerEstrutura[];
  operacoes: IAnswerOperacao[];
  database: IAnswerDatabase[];

  propriedadesDeclaradas: IPropriedadeDeclarada[];
};

const askConfirm = async (inquirer: typeof inq, msg: string) => {
  const aws = await inquirer.prompt<{ confirm: boolean }>([{ name: 'confirm', type: 'confirm', message: msg }]);
  return aws.confirm;
};

export async function moduleCorePromptQuestions(inquirer: typeof inq): Promise<IModuleCoreAnswers> {
  const { modulePath } = await inquirer.prompt<{ modulePath: string }>([
    {
      type: 'input',
      name: 'modulePath',
      message: 'Localização do módulo (dentro de src/application/business):',
      default: 'escopo/modulo',
    },
  ]);

  const moduleName = basename(modulePath);
  const moduleNameParent = basename(dirname(modulePath));

  const moduleNameParentKebab = ChangeCase.kebabCase(moduleNameParent);
  const moduleNameParentPrefix = moduleNameParentKebab?.trim() ? `${moduleNameParentKebab}/` : '';

  const moduleNameKebab = ChangeCase.kebabCase(moduleName);
  const moduleNamePascal = ChangeCase.pascalCase(moduleName);

  const { estrutura } = await inquirer.prompt<{ estrutura: IAnswerEstrutura[] }>([
    {
      type: 'checkbox',
      name: 'estrutura',
      message: 'Estrutura do módulo',
      choices: [
        {
          name: `Possui entidade`,
          short: `I${moduleNamePascal}Model.ts`,
          value: 'model',
          checked: true,
        },
        {
          name: `Incluir ${moduleNameParentPrefix}${moduleNameKebab}/${moduleNameKebab}.service.ts`,
          value: 'service',
          checked: true,
        },
        {
          name: `Incluir ${moduleNameParentPrefix}${moduleNameKebab}/${moduleNameKebab}.controller.ts`,
          value: 'controller',
          checked: true,
        },
        {
          name: `Incluir ${moduleNameParentPrefix}${moduleNameKebab}/${moduleNameKebab}.resolver.ts`,
          value: 'resolver',
          checked: true,
        },
      ],
    },
  ]);

  const { operacoes } = await inquirer.prompt<{ operacoes: IAnswerOperacao[] }>([
    {
      type: 'checkbox',
      name: 'operacoes',
      message: 'Ações para incluir',
      when: () => estrutura.includes('model'),
      default: estrutura.includes('model') ? undefined : [],
      choices: [
        {
          name: `${moduleNamePascal} - Create`,
          short: `${moduleNamePascal} - Create`,
          value: 'handle-resource-create',
          checked: true,
        },
        {
          name: `${moduleNamePascal} - Read`,
          short: `${moduleNamePascal} - Read`,
          value: 'handle-resource-read',
          checked: true,
        },
        {
          name: `${moduleNamePascal} - Update`,
          short: `${moduleNamePascal} - Update`,
          value: 'handle-resource-update',
          checked: true,
        },
        {
          name: `${moduleNamePascal} - Delete`,
          short: `${moduleNamePascal} - Delete`,
          value: 'handle-resource-delete',
          checked: true,
        },
      ],
    },
  ]);

  const { database } = await inquirer.prompt<{ database: IAnswerDatabase[] }>([
    {
      type: 'checkbox',
      name: 'database',
      message: 'Integração ao banco de dados.',
      when: () => estrutura.includes('model'),
      default: estrutura.includes('model') ? undefined : [],
      choices: [
        new inquirer.Separator(' = DATABASE = '),

        {
          name: `[db] Entity - entities/${moduleNameParentPrefix}${moduleNameKebab}.entity.ts`,
          short: `${moduleNamePascal}Entity.ts`,
          value: 'db-entity',
          checked: true,
        },

        {
          name: `[db] Repository - repositories/${moduleNameParentPrefix}${moduleNameKebab}.repository.ts`,
          short: `${moduleNameKebab}.repository.ts`,
          value: 'db-repository',
          checked: true,
        },

        {
          name: `[db] Migration Create Table - migrations/${timestamp}-${moduleNameParentKebab}-create-table-${moduleNameKebab}.ts`,
          short: `${timestamp}-${moduleNameParentKebab}-create-table-${moduleNameKebab}.ts`,
          value: 'db-migration-create-table',
          checked: true,
        },
      ],
    },
  ]);

  let propriedadesDeclaradas: IPropriedadeDeclarada[] = [];

  const podeDeclararPropriedades = estrutura.includes('model');
  const deveDeclararPropriedades = podeDeclararPropriedades && (await askConfirm(inq, 'Deseja declarar as propriedades do modelo?'));

  if (deveDeclararPropriedades) {
    let count = propriedadesDeclaradas.length;

    do {
      const { nome, descricao, tipoInterface } = await inquirer.prompt([
        {
          name: 'nome',
          type: 'input',
          message: `----- Propriedade #${count} - Nome (de preferencia em formato camelCase):`,
        },
        {
          name: 'descricao',
          type: 'input',
          message: `----- Propriedade #${count} - Descrição:`,
        },
        {
          name: 'tipoInterface',
          type: 'input',
          message: `----- Propriedade #${count} - Tipagem da propriedade na interface do modelo:`,
        },
      ]);

      if (await askConfirm(inq, 'Confirma a declaração desta propriedade?')) {
        propriedadesDeclaradas.push({
          nome,
          descricao,
          tipoInterface,
        });
      }
    } while (await askConfirm(inq, 'Deseja declarar mais propriedades ao modelo?'));
  }

  return {
    modulePath,
    moduleName,
    moduleNameParent,
    estrutura,
    operacoes,
    database,
    propriedadesDeclaradas,
  };
}
