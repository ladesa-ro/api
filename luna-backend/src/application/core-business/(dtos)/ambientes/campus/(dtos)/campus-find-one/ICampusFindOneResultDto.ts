import { IEnderecoFindOneResultDto } from '../../../endereco/(dtos)/endereco-find-one/IEnderecoFindOneResultDto';
import { ICampusModel } from '../../ICampusModel';

export interface ICampusFindOneResultDto extends Pick<ICampusModel, 'id' | 'nomeFantasia' | 'razaoSocial' | 'nomeFantasia' | 'apelido' | 'cnpj'> {
  endereco: IEnderecoFindOneResultDto;
}
