import { ICampusModel, IDatedObject, IEntityDate, IObjectUuid, IUsuarioModel } from '../..';

export interface IUsuarioVinculoCampusModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  ativo: boolean;
  cargo: string;

  //

  campus: ICampusModel;
  usuario: IUsuarioModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
