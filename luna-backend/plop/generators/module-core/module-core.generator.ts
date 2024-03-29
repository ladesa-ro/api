import { ActionType, PlopGeneratorConfig } from 'plop';
import { ChangeCaseHelper } from '../../helpers';
import { BaseModuleCoreGenerator } from './generators/BaseModuleCoreGenerator';
import { ModuleCoreGeneratorAuthzStatement } from './generators/ModuleCoreGeneratorAuthzStatement';
import { ModuleCoreGeneratorBaseAuthzPolicy } from './generators/ModuleCoreGeneratorBaseAuthzPolicy';
import { ModuleCoreGeneratorDatabaseContextCore } from './generators/ModuleCoreGeneratorDatabaseContextCore';
import { IModuleDeclareClass, ModuleCoreGeneratorNestModule } from './generators/ModuleCoreGeneratorNestModule';
import { ModuleCoreGeneratorOperations } from './generators/ModuleCoreGeneratorOperations';
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
      path: `src/application/business/{{ c_kebab moduleNameParent }}/{{ c_kebab moduleNameParent }}.module.ts`,
      templateFile: `${templateBase}/core-module/module.ts.hbs`,
      skipIfExists: true,
    });

    actions.push({
      type: 'add',
      path: `${outputPathModule}/{{ c_kebab moduleName }}.module.ts`,
      templateFile: `${templateBase}/core-module/module.ts.hbs`,
      skipIfExists: true,
    });

    actions.push({
      type: 'modify',
      path: `src/application/business/{{ c_kebab moduleNameParent }}/{{ c_kebab moduleNameParent }}.module.ts`,
      transform: async (code: string) =>
        new ModuleCoreGeneratorNestModule()
          .appendModuleConfig({
            declareInModuleProperty: 'imports',
            classImportName: `${ChangeCaseHelper.c_pascal(answers.moduleName)}Module`,
            classImportPath: `./${ChangeCaseHelper.c_kebab(answers.moduleName)}/${ChangeCaseHelper.c_kebab(answers.moduleName)}.module`,
          })
          .transform(code),
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
        transform: async (code: string) => moduleCoreGeneratorNestModule.transform(code),
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
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}.repository`).transform(code),
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
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_snake(answers.moduleNameParent)}`).transform(code),
      });

      actions.push({
        type: 'modify',
        path: `src/infrastructure/integrate-database/database-context/core/database-context.core.ts`,
        transform: async (code: string) => new ModuleCoreGeneratorDatabaseContextCore().addRepository(answers.moduleName).transform(code),
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
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${modelName}`).transform(code),
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
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}`).transform(code),
      });

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/${ChangeCaseHelper.c_kebab(answers.moduleName)}.dto.ts`,
        templateFile: `${templateBase}/core-module-dto/dto.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}.dto`).transform(code),
      });
    }

    if (answers.operacoes.length > 0) {
      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/${ChangeCaseHelper.c_kebab(answers.moduleName)}.operations.ts`,
        templateFile: `${templateBase}/core-module-dto/operations.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}.operations`).transform(code),
      });

      actions.push({
        type: 'add',
        path: `${outputPathSpec}/operations/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathSpec}/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./operations`).transform(code),
      });
    }

    if (answers.operacoes.includes('handle-resource-create') || answers.operacoes.includes('handle-resource-update')) {
      actions.push({
        type: 'add',
        path: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-input/index.ts`,
        templateFile: `${templateBase}/spec/index.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'add',
        path: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-input/I{{ c_pascal moduleName }}InputDto.ts`,
        templateFile: `${templateBase}/spec/operations/input/IInputDto.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-input/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./I${ChangeCaseHelper.c_pascal(answers.moduleName)}InputDto`).transform(code),
      });

      actions.push({
        type: 'modify',
        path: `${outputPathSpec}/operations/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-input`).transform(code),
      });

      //

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/{{ c_kebab moduleName }}-input.operation.ts`,
        templateFile: `${templateBase}/core-module-dto/input.operation.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-input.operation`).transform(code),
      });

      if (answers.operacoes.includes('handle-resource-create')) {
        actions.push({
          type: 'add',
          path: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-input/I{{ c_pascal moduleName }}CreateDto.ts`,
          templateFile: `${templateBase}/spec/operations/input/ICreateDto.ts.hbs`,
          skipIfExists: true,
        });

        actions.push({
          type: 'modify',
          path: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-input/index.ts`,
          transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./I${ChangeCaseHelper.c_pascal(answers.moduleName)}CreateDto`).transform(code),
        });

        //

        actions.push({
          type: 'add',
          path: `${outputPathModule}/dtos/{{ c_kebab moduleName }}-create.operation.ts`,
          templateFile: `${templateBase}/core-module-dto/create.operation.ts.hbs`,
          skipIfExists: true,
        });

        actions.push({
          type: 'modify',
          path: `${outputPathModule}/dtos/index.ts`,
          transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-create.operation`).transform(code),
        });

        actions.push({
          type: 'modify',
          path: `${outputPathModule}/dtos/${ChangeCaseHelper.c_kebab(answers.moduleName)}.operations.ts`,
          transform: async (code: string) =>
            new ModuleCoreGeneratorOperations()
              .addOperation(`${ChangeCaseHelper.c_constant(answers.moduleName)}_CREATE`, `./${ChangeCaseHelper.c_kebab(answers.moduleName)}-create.operation`)
              .transform(code),
        });

        //

        actions.push({
          type: 'modify',
          path: `src/application/authorization-policies/statements/IAuthzStatement.ts`,
          transform: async (code: string) =>
            new ModuleCoreGeneratorAuthzStatement()
              .addTypeDeclarationStatement(
                `IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Create`,
                `${ChangeCaseHelper.c_snake(answers.moduleName)}:create`,
                'check',
                `Dto.I${ChangeCaseHelper.c_pascal(answers.moduleName)}InputDto`,
              )
              .transform(code),
        });

        actions.push({
          type: 'modify',
          path: `src/application/authorization-policies/BaseAuthzPolicy.ts`,
          transform: async (code: string) =>
            new ModuleCoreGeneratorBaseAuthzPolicy()
              .addTypeDeclarationStatement(`${ChangeCaseHelper.c_camel(answers.moduleName)}Create`, `IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Create`)
              .transform(code),
        });
      }

      if (answers.operacoes.includes('handle-resource-update')) {
        actions.push({
          type: 'add',
          path: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-input/I{{ c_pascal moduleName }}UpdateDto.ts`,
          templateFile: `${templateBase}/spec/operations/input/IUpdateDto.ts.hbs`,
          skipIfExists: true,
        });

        actions.push({
          type: 'modify',
          path: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-input/index.ts`,
          transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./I${ChangeCaseHelper.c_pascal(answers.moduleName)}UpdateDto`).transform(code),
        });

        //

        actions.push({
          type: 'add',
          path: `${outputPathModule}/dtos/{{ c_kebab moduleName }}-update.operation.ts`,
          templateFile: `${templateBase}/core-module-dto/update.operation.ts.hbs`,
          skipIfExists: true,
        });

        actions.push({
          type: 'modify',
          path: `${outputPathModule}/dtos/index.ts`,
          transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-update.operation`).transform(code),
        });

        actions.push({
          type: 'modify',
          path: `${outputPathModule}/dtos/${ChangeCaseHelper.c_kebab(answers.moduleName)}.operations.ts`,
          transform: async (code: string) =>
            new ModuleCoreGeneratorOperations()
              .addOperation(`${ChangeCaseHelper.c_constant(answers.moduleName)}_UPDATE`, `./${ChangeCaseHelper.c_kebab(answers.moduleName)}-update.operation`)
              .transform(code),
        });

        //

        actions.push({
          type: 'modify',
          path: `src/application/authorization-policies/statements/IAuthzStatement.ts`,
          transform: async (code: string) =>
            new ModuleCoreGeneratorAuthzStatement()
              .addTypeDeclarationStatement(
                `IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Update`,
                `${ChangeCaseHelper.c_snake(answers.moduleName)}:update`,
                'filter',
                `Dto.I${ChangeCaseHelper.c_pascal(answers.moduleName)}UpdateDto`,
              )
              .transform(code),
        });

        actions.push({
          type: 'modify',
          path: `src/application/authorization-policies/BaseAuthzPolicy.ts`,
          transform: async (code: string) =>
            new ModuleCoreGeneratorBaseAuthzPolicy()
              .addTypeDeclarationStatement(`${ChangeCaseHelper.c_camel(answers.moduleName)}Update`, `IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Update`)
              .transform(code),
        });
      }
    }

    if (answers.operacoes.includes('handle-resource-delete')) {
      actions.push({
        type: 'addMany',
        destination: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-delete`,
        base: `${templateBase}/spec/operations/delete`,
        templateFiles: `${templateBase}/spec/operations/delete/**/*`,
        skipIfExists: true,
        verbose: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathSpec}/operations/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-delete`).transform(code),
      });

      //

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/{{ c_kebab moduleName }}-delete-one.operation.ts`,
        templateFile: `${templateBase}/core-module-dto/delete-one.operation.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/index.ts`,
        transform: async (code: string) => new BaseModuleCoreGenerator().addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-delete-one.operation`).transform(code),
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/${ChangeCaseHelper.c_kebab(answers.moduleName)}.operations.ts`,
        transform: async (code: string) =>
          new ModuleCoreGeneratorOperations()
            .addOperation(`${ChangeCaseHelper.c_constant(answers.moduleName)}_DELETE_ONE_BY_ID`, `./${ChangeCaseHelper.c_kebab(answers.moduleName)}-delete-one.operation`)
            .transform(code),
      });

      //

      actions.push({
        type: 'modify',
        path: `src/application/authorization-policies/statements/IAuthzStatement.ts`,
        transform: async (code: string) =>
          new ModuleCoreGeneratorAuthzStatement()
            .addTypeDeclarationStatement(
              `IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Delete`,
              `${ChangeCaseHelper.c_snake(answers.moduleName)}:delete`,
              'filter',
              `Dto.I${ChangeCaseHelper.c_pascal(answers.moduleName)}DeleteOneByIdInputDto`,
            )
            .transform(code),
      });

      actions.push({
        type: 'modify',
        path: `src/application/authorization-policies/BaseAuthzPolicy.ts`,
        transform: async (code: string) =>
          new ModuleCoreGeneratorBaseAuthzPolicy()
            .addTypeDeclarationStatement(`${ChangeCaseHelper.c_camel(answers.moduleName)}Delete`, `IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Delete`)
            .transform(code),
      });
    }

    if (answers.operacoes.includes('handle-resource-read')) {
      actions.push({
        type: 'addMany',
        destination: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-find-one`,
        base: `${templateBase}/spec/operations/find-one`,
        templateFiles: `${templateBase}/spec/operations/find-one/**/*`,
        skipIfExists: true,
        verbose: true,
      });

      actions.push({
        type: 'addMany',
        destination: `${outputPathSpec}/operations/{{ c_kebab moduleName }}-find-all`,
        base: `${templateBase}/spec/operations/find-all`,
        templateFiles: `${templateBase}/spec/operations/find-all/**/*`,
        skipIfExists: true,
        verbose: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathSpec}/operations/index.ts`,
        transform: async (code: string) =>
          new BaseModuleCoreGenerator()
            .addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-find-all`)
            .addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-find-one`)
            .transform(code),
      });

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/{{ c_kebab moduleName }}-find-all.operation.ts`,
        templateFile: `${templateBase}/core-module-dto/find-all.operation.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'add',
        path: `${outputPathModule}/dtos/{{ c_kebab moduleName }}-find-one.operation.ts`,
        templateFile: `${templateBase}/core-module-dto/find-one.operation.ts.hbs`,
        skipIfExists: true,
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/index.ts`,
        transform: async (code: string) =>
          new BaseModuleCoreGenerator()
            .addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-find-all.operation`)
            .addExportAllFrom(`./${ChangeCaseHelper.c_kebab(answers.moduleName)}-find-one.operation`)
            .transform(code),
      });

      actions.push({
        type: 'modify',
        path: `${outputPathModule}/dtos/${ChangeCaseHelper.c_kebab(answers.moduleName)}.operations.ts`,
        transform: async (code: string) =>
          new ModuleCoreGeneratorOperations()
            .addOperation(`${ChangeCaseHelper.c_constant(answers.moduleName)}_FIND_ALL`, `./${ChangeCaseHelper.c_kebab(answers.moduleName)}-find-all.operation`)
            .addOperation(`${ChangeCaseHelper.c_constant(answers.moduleName)}_FIND_ONE_BY_ID`, `./${ChangeCaseHelper.c_kebab(answers.moduleName)}-find-one.operation`)
            .transform(code),
      });

      //

      actions.push({
        type: 'modify',
        path: `src/application/authorization-policies/statements/IAuthzStatement.ts`,
        transform: async (code: string) =>
          new ModuleCoreGeneratorAuthzStatement()
            .addTypeDeclarationStatement(`IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Filter`, `${ChangeCaseHelper.c_snake(answers.moduleName)}:find`, 'filter', null)
            .transform(code),
      });

      actions.push({
        type: 'modify',
        path: `src/application/authorization-policies/BaseAuthzPolicy.ts`,
        transform: async (code: string) =>
          new ModuleCoreGeneratorBaseAuthzPolicy()
            .addTypeDeclarationStatement(`${ChangeCaseHelper.c_camel(answers.moduleName)}Filter`, `IAuthzStatement${ChangeCaseHelper.c_pascal(answers.moduleName)}Filter`)
            .transform(code),
      });
    }

    //

    return actions;
  },
};
