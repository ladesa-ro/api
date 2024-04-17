import { IObjectUuid } from 'application/business/(spec)/(core)';

export interface IUsuarioVinculoCampusListByUsuarioAndCampusInputDto {
  campus: IObjectUuid;
  usuario: IObjectUuid;
}
