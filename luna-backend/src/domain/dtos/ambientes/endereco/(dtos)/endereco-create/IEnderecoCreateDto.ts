import { IEnderecoModel } from '../../(models)/IEnderecoModel';
import { IObjectId } from '../../../..';

export interface IEnderecoCreateDto
  extends Pick<
    IEnderecoModel,
    | 'cep'
    | 'logradouro'
    | 'numero'
    | 'bairro'
    | 'complemento'
    | 'pontoReferencia'
  > {
  cidade: IObjectId;
}
