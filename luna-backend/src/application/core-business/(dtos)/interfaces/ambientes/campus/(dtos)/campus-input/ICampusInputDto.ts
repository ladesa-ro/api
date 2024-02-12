import { ICampusModel } from '../../(models)';
import { IEnderecoInputDto } from '../../../endereco';

export interface ICampusInputDto
  extends Pick<
    ICampusModel,
    'nomeFantasia' | 'razaoSocial' | 'nomeFantasia' | 'apelido' | 'cnpj'
  > {
  endereco: IEnderecoInputDto;
}
