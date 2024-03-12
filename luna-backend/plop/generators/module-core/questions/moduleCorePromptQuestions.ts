import * as ChangeCase from 'change-case';
import inq from 'inquirer';
import { basename, dirname } from 'path';
import { ChangeCaseHelper } from '../../../helpers';
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

  nullable: boolean;
  nomeColuna: string;
  tipoEntidadeColuna: string | null;
  tipoEntidadeInterface: string | null;

  tipoSwagger: string | null;
  tipoGraphQl: string | null;
};

export type IModuleCoreAnswers = {
  migrationTimestamp: number;

  modulePath: string;
  moduleName: string;
  moduleNameParent: string;

  estrutura: IAnswerEstrutura[];
  operacoes: IAnswerOperacao[];
  database: IAnswerDatabase[];

  modelIdType: 'uuid' | 'numeric' | null;
  modelDated: boolean | null;

  propriedadesDeclaradas: IPropriedadeDeclarada[];
};

const askConfirm = async (inquirer: typeof inq, msg: string, defaultValue = true) => {
  const aws = await inquirer.prompt<{ confirm: boolean }>([{ name: 'confirm', type: 'confirm', message: msg, default: defaultValue }]);
  return aws.confirm;
};

const ENABLE_MOCK_PROFESSOR = true;

export async function moduleCorePromptQuestions(inquirer: typeof inq): Promise<IModuleCoreAnswers> {
  if (ENABLE_MOCK_PROFESSOR) {
    return {
      migrationTimestamp: Date.now(),

      modelIdType: 'uuid',
      modelDated: true,
      //
      modulePath: 'ensino/professor',
      moduleName: 'professor',
      moduleNameParent: 'ensino',
      estrutura: ['controller', 'model', 'resolver', 'service'],
      operacoes: ['handle-resource-create', 'handle-resource-delete', 'handle-resource-read', 'handle-resource-update'],
      database: ['db-entity', 'db-migration-create-table', 'db-repository'],
      propriedadesDeclaradas: [
        {
          nome: 'nome',
          descricao: 'descricao',
          nullable: false,
          nomeColuna: 'nome',
          tipoEntidadeColuna: 'text',
          tipoEntidadeInterface: 'string',
          tipoGraphQl: 'String',
          tipoSwagger: "'string'",
          tipoInterface: 'string',
        },
      ],
    };
  }

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
          checked: false,
        },
      ],
    },
  ]);

  let propriedadesDeclaradas: IPropriedadeDeclarada[] = [];

  const podeDeclararPropriedades = estrutura.includes('model');
  const deveDeclararPropriedades = podeDeclararPropriedades && (await askConfirm(inq, 'Deseja declarar as propriedades do modelo?', true));

  let modelIdType = null;
  let modelDated = null;

  if (deveDeclararPropriedades) {
    const aws = await inquirer.prompt<{ modelIdType: 'uuid' | 'numeric'; modelDated: boolean }>([
      {
        type: 'list',
        name: 'modelIdType',

        message: `< Tipo de identificador do I${ChangeCaseHelper.c_pascal(moduleName)}Model:`,

        choices: [
          {
            name: `<----> uuid`,
            short: `uuid`,
            value: 'uuid',
          },

          {
            name: `<----> numerico`,
            short: `int`,
            value: 'numeric',
          },
        ],
      },
      {
        type: 'confirm',
        name: 'modelDated',
        message: `< Incluir datas (dateCreated, dateUpdated e dateDeleted) no I${ChangeCaseHelper.c_pascal(moduleName)}Model:`,
        default: true,
      },
    ]);

    modelIdType = aws.modelIdType;
    modelDated = aws.modelDated;

    do {
      let count = propriedadesDeclaradas.length;

      const { nome, descricao, tipoInterface, nullable, nomeColuna, tipoSwagger, tipoGraphQl, tipoEntidadeColuna, tipoEntidadeInterface } = await inquirer.prompt([
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
        {
          name: 'tipoEntidadeColuna',
          type: 'input',
          when: () => database.includes('db-entity'),
          message: `----- Propriedade #${count} - [DB] - Tipo da coluna no banco de dados (text, varchar, time, date):`,
        },
        {
          name: 'tipoSwagger',
          type: 'input',
          message: `----- Propriedade #${count} - [SWAGGER] - Tipo da propriedade na declaração do dto swagger (LEMBRE DAS ASPAS):`,
        },
        {
          name: 'tipoGraphQl',
          type: 'input',
          message: `----- Propriedade #${count} - [GRAPHQL] - Tipo da propriedade na declaração do dto graphql:`,
        },
        {
          name: 'nullable',
          type: 'confirm',
          message: `----- Propriedade #${count} - Coluna anulável?`,
          default: false,
        },
        {
          name: 'nomeColuna',
          type: 'input',
          when: () => database.includes('db-entity'),
          message: `----- Propriedade #${count} - [DB] - Nome da coluna no banco de dados (a que fica na tabela):`,
          default: (aws: any) => ChangeCaseHelper.c_snake(aws.nome),
        },
        {
          name: 'tipoEntidadeInterface',
          type: 'input',
          when: () => database.includes('db-entity'),
          message: `----- Propriedade #${count} - [DB] - tipagem da propriedade na classe:`,
          default: (aws: any) => aws.tipoInterface,
        },
      ]);

      if (await askConfirm(inq, 'Confirma a declaração desta propriedade?', false)) {
        propriedadesDeclaradas.push({
          tipoSwagger,
          tipoGraphQl,
          nullable,
          nomeColuna,
          tipoEntidadeColuna,
          tipoEntidadeInterface,
          nome,
          descricao,
          tipoInterface,
        });
      }
    } while (await askConfirm(inq, 'Deseja declarar mais propriedades ao modelo?', true));
  }

  return {
    migrationTimestamp: Date.now(),

    modelIdType,
    modelDated,
    //
    modulePath,
    moduleName,
    moduleNameParent,
    estrutura,
    operacoes,
    database,
    propriedadesDeclaradas,
  };
}
