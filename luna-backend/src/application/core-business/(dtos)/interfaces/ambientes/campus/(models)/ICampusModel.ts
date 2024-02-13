import { IDatedObject, IEntityDate, IObjectUuid } from '../../../(core)';
import { IEnderecoModel } from '../../endereco';

export interface ICampusModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  razaoSocial: string;
  nomeFantasia: string;
  apelido: string;
  cnpj: string;

  //

  endereco: IEnderecoModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
