// plopfile.ts
import * as ChangeCase from 'change-case';
import { NodePlopAPI } from 'plop';
import { ModuleCoreGenerator } from './generators/module-core/module-core.generator';

export default function (plop: NodePlopAPI) {
  plop.setHelper('c_camel', ChangeCase.camelCase);
  plop.setHelper('c_capital', ChangeCase.capitalCase);
  plop.setHelper('c_constant', ChangeCase.constantCase);
  plop.setHelper('c_dot', ChangeCase.dotCase);
  plop.setHelper('c_kebab', ChangeCase.kebabCase);
  plop.setHelper('c_no', ChangeCase.noCase);
  plop.setHelper('c_pascal', ChangeCase.pascalCase);
  plop.setHelper('c_pascalSnake', ChangeCase.pascalSnakeCase);
  plop.setHelper('c_path', ChangeCase.pathCase);
  plop.setHelper('c_sentence', ChangeCase.sentenceCase);
  plop.setHelper('c_snake', ChangeCase.snakeCase);
  plop.setHelper('c_train', ChangeCase.trainCase);

  plop.setGenerator('module-core', ModuleCoreGenerator);
}
