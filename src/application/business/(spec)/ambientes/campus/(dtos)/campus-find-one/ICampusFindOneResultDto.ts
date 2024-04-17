import * as Dto from '../../../..';
import { ICampusModel } from '../../ICampusModel';

export interface ICampusFindOneResultDto extends Pick<ICampusModel, 'id' | 'nomeFantasia' | 'razaoSocial' | 'nomeFantasia' | 'apelido' | 'cnpj'> {
  endereco: Dto.IEnderecoFindOneResultDto;

  modalidades: Dto.IModalidadeFindOneResultDto[];
}
