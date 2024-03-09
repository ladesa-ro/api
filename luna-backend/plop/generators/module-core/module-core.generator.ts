import { ActionType, PlopGeneratorConfig } from 'plop';
import { ChangeCaseHelper } from '../../helpers';
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

    const outputPathSpec = `src/application/business/(spec)/{{ c_kebab moduleNameParent }}/{{ c_kebab moduleName }}`;
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

    if (answers.estrutura.includes('model')) {
      actions.push({
        type: 'add',
        path: `${outputPathSpec}/I{{ c_pascal moduleName }}Model.ts`,
        templateFile: `${templateBase}/spec/IModel.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'add',
        path: `${outputPathSpec}/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });
    }

    //

    return actions;
  },
};
