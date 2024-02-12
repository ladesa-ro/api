import { IEnderecoModel } from '../../(models)';
import { IObjectId } from '../../../../(core)';

export interface IEnderecoInputDto
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
