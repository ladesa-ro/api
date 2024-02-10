import { IEnderecoModel } from '../../(models)/IEnderecoModel';

export interface IEnderecoUpdateDto
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
