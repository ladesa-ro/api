import { IEnderecoInputDto } from '../../../endereco';
import { ICampusFindOneByIdInputDto } from '../campus-find-one';
import { ICampusInputDto } from './ICampusInputDto';

export interface ICampusUpdateDto
  extends ICampusFindOneByIdInputDto,
    Partial<ICampusInputDto> {
  //

  id: string;

  //

  razaoSocial?: string;
  nomeFantasia?: string;
  apelido?: string;
  cnpj?: string;

  //

  endereco?: IEnderecoInputDto;

  //
}
