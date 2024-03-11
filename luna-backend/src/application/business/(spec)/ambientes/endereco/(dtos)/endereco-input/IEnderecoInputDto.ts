import { IObjectId } from '../../../../(core)';
import { IEnderecoModel } from '../../IEnderecoModel';

export interface IEnderecoInputDto extends Pick<IEnderecoModel, 'cep' | 'logradouro' | 'numero' | 'bairro' | 'complemento' | 'pontoReferencia'> {
  cidade: IObjectId;
}
