import * as Dto from '../../(core)';
import { IImagemModel } from '../../base';

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

  dateCreated: Dto.IEntityDate;
  dateUpdated: Dto.IEntityDate;
  dateDeleted: null | Dto.IEntityDate;

  //
}
