import { ICampusModel } from '../../(models)/ICampusModel';
import { IEnderecoFindOneResultDto } from '../../../endereco/(dtos)/endereco-find-one/IEnderecoFindOneResultDto';

export interface ICampusFindOneResultDto
  extends Pick<
    ICampusModel,
    | 'id'
    | 'nomeFantasia'
    | 'razaoSocial'
    | 'nomeFantasia'
    | 'apelido'
    | 'cnpj'
    | 'dateCreated'
    | 'dateUpdated'
    | 'dateDeleted'
  > {
  endereco: IEnderecoFindOneResultDto;
}
