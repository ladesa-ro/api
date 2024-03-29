import { IDatedObject, IEntityDate, IObjectUuid } from '../../(core)';
import { IImagemModel } from '../../base/imagem';
import { IAmbienteModel } from '../ambiente';
import { ICampusModel } from '../campus';

export interface IBlocoModel extends IObjectUuid, IDatedObject {
  // =================================

  id: string;

  // =================================

  nome: string;
  codigo: string;

  // =================================

  campus: ICampusModel;

  //

  ambientes: IAmbienteModel[];
  imagemCapa: IImagemModel | null;

  // =================================

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  // =================================
}
