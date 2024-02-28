import { IObjectUuid } from 'application/business/(dtos)/(core)';

export interface IUsuarioVinculoCampusListByUsuarioAndCampusInputDto {
  campus: IObjectUuid;
  usuario: IObjectUuid;
}
