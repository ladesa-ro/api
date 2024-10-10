import * as ChangeCase from "change-case";
import type { NodePlopAPI } from "plop";

export const ChangeCaseHelper = {
  c_camel: ChangeCase.camelCase,
  c_capital: ChangeCase.capitalCase,
  c_constant: ChangeCase.constantCase,
  c_dot: ChangeCase.dotCase,
  c_kebab: ChangeCase.kebabCase,
  c_no: ChangeCase.noCase,
  c_pascal: ChangeCase.pascalCase,
  c_pascalSnake: ChangeCase.pascalSnakeCase,
  c_path: ChangeCase.pathCase,
  c_sentence: ChangeCase.sentenceCase,
  c_snake: ChangeCase.snakeCase,
  c_train: ChangeCase.trainCase,
};

export const ChangeCaseHelperPlop = (plop: NodePlopAPI) => {
  plop.setHelper("c_camel", ChangeCase.camelCase);
  plop.setHelper("c_capital", ChangeCase.capitalCase);
  plop.setHelper("c_constant", ChangeCase.constantCase);
  plop.setHelper("c_dot", ChangeCase.dotCase);
  plop.setHelper("c_kebab", ChangeCase.kebabCase);
  plop.setHelper("c_no", ChangeCase.noCase);
  plop.setHelper("c_pascal", ChangeCase.pascalCase);
  plop.setHelper("c_pascalSnake", ChangeCase.pascalSnakeCase);
  plop.setHelper("c_path", ChangeCase.pathCase);
  plop.setHelper("c_sentence", ChangeCase.sentenceCase);
  plop.setHelper("c_snake", ChangeCase.snakeCase);
  plop.setHelper("c_train", ChangeCase.trainCase);

  return plop;
};
