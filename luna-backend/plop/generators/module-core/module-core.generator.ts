import { PlopGeneratorConfig } from 'plop';

export const ModuleCoreGenerator: Partial<PlopGeneratorConfig> = {
  description: 'Módulo Genérico.',

  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'Nome do módulo.',
    },
  ],

  actions: [
    {
      type: 'addMany',
      destination: 'src/application/business/{{ c_kebab name }}',
      base: "./plop/generators/module-core/hbs",
      templateFiles: `./plop/generators/module-core/hbs/**/*.hbs`,
      skipIfExists: true
    },
  ],
};

