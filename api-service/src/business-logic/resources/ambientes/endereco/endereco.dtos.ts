import { CompileYupSchema, getLadesaNodesRepository } from "@/business-logic/standards";

export const GetEnderecoInputSchema = () => {
  const repository = getLadesaNodesRepository();
  const yupCompiler = new CompileYupSchema(repository);

  const enderecoInputView = repository.GetRealTargetStrict(PocTypings.Tokens.Endereco.Views.Input);

  return yupCompiler.Handle(enderecoInputView);
};
