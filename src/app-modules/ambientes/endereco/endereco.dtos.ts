import { CompileYupSchema, getLadesaNodesRepository } from '@/app-standards';
import * as LadesaTypings from '@ladesa-ro/especificacao';

export const GetEnderecoInputSchema = () => {
  const repository = getLadesaNodesRepository();
  const yupCompiler = new CompileYupSchema(repository);

  const enderecoInputView = repository.GetRealTargetStrict(LadesaTypings.Tokens.Endereco.Views.Input);

  return yupCompiler.Handle(enderecoInputView);
};
