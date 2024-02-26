import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';

export interface IUsuarioModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  nome: string;
  matriculaSiape: string;
  email: string;

  //

  isSuperUser: boolean;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
