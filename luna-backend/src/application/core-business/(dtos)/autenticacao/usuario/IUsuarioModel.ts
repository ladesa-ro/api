import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';

export interface IUsuarioModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  nome: string;
  matriculaSiape: string | null;
  email: string | null;

  //

  isSuperUser: boolean;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
