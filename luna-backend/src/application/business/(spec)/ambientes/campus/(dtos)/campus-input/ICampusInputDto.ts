import { IObjectUuid } from '../../../../(core)';
import { IEnderecoInputDto } from '../../../endereco';
import { ICampusModel } from '../../ICampusModel';

export interface ICampusInputDto extends Pick<ICampusModel, 'nomeFantasia' | 'razaoSocial' | 'apelido' | 'cnpj'> {
  endereco: IEnderecoInputDto;
  modalidades: IObjectUuid[];
}
