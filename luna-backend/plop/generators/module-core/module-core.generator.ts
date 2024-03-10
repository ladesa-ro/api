import { ActionType, PlopGeneratorConfig } from 'plop';
import { ChangeCaseHelper } from '../../helpers';
import { BaseModuleCoreGenerator } from './generators/BaseModuleCoreGenerator';
import { ModuleCoreGeneratorDatabaseContextCore } from './generators/ModuleCoreGeneratorDatabaseContextCore';
import { IModuleDeclareClass, ModuleCoreGeneratorNestModule } from './generators/ModuleCoreGeneratorNestModule';
import { IAnswerEstrutura, IModuleCoreAnswers, moduleCorePromptQuestions } from './questions/moduleCorePromptQuestions';

export const timestamp = '0000000000000';

export const ModuleCoreGenerator: Partial<PlopGeneratorConfig> = {
  description: 'Módulo Genérico.',

  prompts: moduleCorePromptQuestions,

  actions: (data: any) => {
    const answers = data as IModuleCoreAnswers;

    const actions: ActionType[] = [];

    const templateBase = `./plop/generators/module-core/hbs`;
    const pathSpecBase = `src/application/business/(spec)`;
    const pathTypeormBase = `src/infrastructure/integrate-database/typeorm`;

    const outputPathSpec = `${pathSpecBase}/{{ c_kebab moduleNameParent }}/{{ c_kebab moduleName }}`;
    const outputPathModule = `src/application/business/{{ c_kebab moduleNameParent }}/{{ c_kebab moduleName }}`;

    actions.push({
      type: 'add',
      path: `${outputPathModule}/{{ c_kebab moduleName }}.module.ts`,
      templateFile: `${templateBase}/core-module/module.ts.hbs`,
      skipIfExists: true,
    });

    const moduleCoreGeneratorNestModule = new ModuleCoreGeneratorNestModule();

    type IModuleEstruturaTransform = {
      estrutura: IAnswerEstrutura;
      withTemplate: {
        path: string;
        templateFile: string;
      };
      modifyModule: IModuleDeclareClass;
    };

    const moduleEstruturaTransforms: IModuleEstruturaTransform[] = [
      {
        estrutura: 'controller',
        withTemplate: {
          path: `${outputPathModule}/{{ c_kebab moduleName }}.controller.ts`,
          templateFile: `${templateBase}/core-module/controller.ts.hbs`,
        },
        modifyModule: {
          declareInModuleProperty: ['controllers'],
          classImportName: `${ChangeCaseHelper.c_pascal(answers.moduleName)}Controller`,
          classImportPath: `./${ChangeCaseHelper.c_kebab(answers.moduleName)}.controller`,
        },
      },
      {
        estrutura: 'service',
        withTemplate: {
          path: `${outputPathModule}/{{ c_kebab moduleName }}.service.ts`,
          templateFile: `${templateBase}/core-module/service.ts.hbs`,
        },
        modifyModule: {
          declareInModuleProperty: ['providers', 'exports'],
          classImportName: `${ChangeCaseHelper.c_pascal(answers.moduleName)}Service`,
          classImportPath: `./${ChangeCaseHelper.c_kebab(answers.moduleName)}.service`,
        },
      },
      {
        estrutura: 'resolver',
        withTemplate: {
          path: `${outputPathModule}/{{ c_kebab moduleName }}.resolver.ts`,
          templateFile: `${templateBase}/core-module/resolver.ts.hbs`,
        },
        modifyModule: {
          declareInModuleProperty: ['providers'],
          classImportName: `${ChangeCaseHelper.c_pascal(answers.moduleName)}Resolver`,
          classImportPath: `./${ChangeCaseHelper.c_kebab(answers.moduleName)}.resolver`,
        },
      },
    ];

    for (const moduleEstruturaTransform of moduleEstruturaTransforms) {
      if (answers.estrutura.includes(moduleEstruturaTransform.estrutura)) {
        actions.push({
          type: 'add',
          path: moduleEstruturaTransform.withTemplate.path,
          templateFile: moduleEstruturaTransform.withTemplate.templateFile,
          skipIfExists: true,
        });

        moduleCoreGeneratorNestModule.appendModuleConfig(moduleEstruturaTransform.modifyModule);
      }
    }

    //

    if (moduleCoreGeneratorNestModule.isDirty) {
      actions.push({
        type: 'modify',
        path: `${outputPathModule}/{{ c_kebab moduleName }}.module.ts`,
        transform: async (code) => moduleCoreGeneratorNestModule.transform(code),
      });
    }

    const entityName = `${ChangeCaseHelper.c_snake(answers.moduleName)}.entity`;

    if (answers.database.includes('db-entity')) {
      actions.push({
        type: 'add',
        path: `${pathTypeormBase}/entities/${ChangeCaseHelper.c_snake(answers.moduleNameParent)}/${entityName}.ts`,
        templateFile: `${templateBase}/database/entity.ts.hbs`,
        skipIfExists: true,
      });
    }

    if (answers.database.includes('db-repository')) {
      actions.push({
        type: 'add',
        path: `${pathTypeormBase}/repositories/${ChangeCaseHelper.c_snake(answers.moduleNameParent)}/${ChangeCaseHelper.c_kebab(answers.moduleName)}.repository.ts`,
        templateFile: `${templateBase}/database/repository.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'add',
        path: `${pathTypeormBase}/repositories/${ChangeCaseHelper.c_snake(answers.moduleNameParent)}/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${pathTypeormBase}/repositories/${ChangeCaseHelper.c_snake(answers.moduleNameParent)}/index.ts`,
        transform: async (code) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}.repository`).transform(code),
      });

      actions.push({
        type: 'add',
        path: `${pathTypeormBase}/repositories/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${pathTypeormBase}/repositories/index.ts`,
        transform: async (code) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_snake(answers.moduleNameParent)}`).transform(code),
      });

      actions.push({
        type: 'modify',
        path: `src/infrastructure/integrate-database/database-context/core/database-context.core.ts`,
        transform: async (code) => new ModuleCoreGeneratorDatabaseContextCore().addRepository(answers.moduleName).transform(code),
      });
    }

    if (answers.database.includes('db-migration-create-table')) {
      actions.push({
        type: 'add',
        path: `${pathTypeormBase}/migrations/${++answers.migrationTimestamp}-create-table-${ChangeCaseHelper.c_snake(answers.moduleName)}.ts`,
        templateFile: `${templateBase}/database/migration-create-table.ts.hbs`,
        skipIfExists: true,
      });
    }

    const modelName = `I${ChangeCaseHelper.c_pascal(answers.moduleName)}Model`;

    if (answers.estrutura.includes('model')) {
      actions.push({
        type: 'add',
        path: `${outputPathSpec}/${modelName}.ts`,
        templateFile: `${templateBase}/spec/IModel.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'add',
        path: `${outputPathSpec}/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathSpec}/index.ts`,
        transform: async (code) => new BaseModuleCoreGenerator().addExportAllFrom(`./${modelName}`).transform(code),
      });

      actions.push({
        type: 'add',
        path: `${pathSpecBase}/{{ c_kebab moduleNameParent }}/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${pathSpecBase}/{{ c_kebab moduleNameParent }}/index.ts`,
        transform: async (code) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}`).transform(code),
      });

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/${ChangeCaseHelper.c_kebab(answers.moduleName)}.dto.ts`,
        templateFile: `${templateBase}/core-module-dto/dto.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/index.ts`,
        transform: async (code) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}.dto.ts`).transform(code),
      });
    }

    //

    return actions;
  },
};
