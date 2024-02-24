import { ICampusModel } from '../campus';
import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';

export interface IBlocoModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  nome: string;
  codigo: string;

  //

  campus: ICampusModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
