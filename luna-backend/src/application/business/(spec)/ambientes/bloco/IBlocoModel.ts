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
  imagemCapa: IImagemModel | null;

  // =================================

  ambientes: IAmbienteModel[];

  // =================================

  dateCreated: IEntityDate;
  dateUpdated: IEntityDate;
  dateDeleted: null | IEntityDate;

  // =================================
}
