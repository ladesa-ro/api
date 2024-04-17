import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';
import { ICampusModel } from '../../ambientes';
import { IModalidadeModel } from '../../ensino';

export interface ICalendarioLetivoModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  nome: string;
  ano: number;

  //

  campus: ICampusModel;
  modalidade: IModalidadeModel;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
