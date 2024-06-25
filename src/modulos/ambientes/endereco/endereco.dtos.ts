import * as LadesaTypings from '@ladesa-ro/especificacao';
import { getLadesaNodesRepository } from '../../../fixtures';
import { CompileYupSchema } from '../../../fixtures/ladesa-spec/-helpers/CompileYupSchema';

export const GetEnderecoInputSchema = () => {
  const repository = getLadesaNodesRepository();
  const yupCompiler = new CompileYupSchema(repository);

  const enderecoInputView = repository.GetRealTargetStrict(LadesaTypings.Tokens.Endereco.Views.Input);

  return yupCompiler.Handle(enderecoInputView);
};
