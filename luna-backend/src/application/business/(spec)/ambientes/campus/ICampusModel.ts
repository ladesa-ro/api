import * as Dto from '../../../(spec)';

export interface ICampusModel extends Dto.IObjectUuid, Dto.IDatedObject {
  //

  id: string;

  //

  razaoSocial: string;
  nomeFantasia: string;
  apelido: string;
  cnpj: string;

  //

  endereco: Dto.IEnderecoModel;

  //

  modalidades: Dto.IModalidadeModel[];

  //

  dateCreated: Dto.IEntityDate;
  dateUpdated: Dto.IEntityDate;
  dateDeleted: null | Dto.IEntityDate;

  //
}
