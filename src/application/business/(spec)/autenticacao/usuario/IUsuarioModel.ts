import * as Dto from '../../(core)';
import { IImagemModel } from '../../base';
import { IUsuarioVinculoCampusModel } from '../usuario-vinculo-campus';

export interface IUsuarioModel extends Dto.IObjectUuid, Dto.IDatedObject {
  //

  id: string;

  //

  nome: string;
  matriculaSiape: string;
  email: string;

  //

  isSuperUser: boolean;

  //

  imagemCapa: IImagemModel | null;
  imagemPerfil: IImagemModel | null;

  //

  vinculosAtivos: IUsuarioVinculoCampusModel[];

  //

  dateCreated: Dto.IEntityDate;
  dateUpdated: Dto.IEntityDate;
  dateDeleted: null | Dto.IEntityDate;

  //
}
