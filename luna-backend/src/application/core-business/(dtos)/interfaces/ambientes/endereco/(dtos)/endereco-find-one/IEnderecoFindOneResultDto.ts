import { IEnderecoModel } from '../../(models)';

export interface IEnderecoFindOneResultDto
  extends Pick<
    IEnderecoModel,
    | 'id'
    | 'cep'
    | 'logradouro'
    | 'numero'
    | 'bairro'
    | 'complemento'
    | 'pontoReferencia'
    | 'cidade'
  > {}
