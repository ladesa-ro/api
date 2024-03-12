import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';

export interface IModalidadeModel extends IObjectUuid, IDatedObject {
  //

  id: string;

  //

  nome: string;
  slug: string;

  //

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  //
}
