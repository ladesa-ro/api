import { IObjectUuid } from 'application/core-business/(dtos)/(core)';

export interface IUsuarioVinculoCampusListByUsuarioAndCampusInputDto {
  campus: IObjectUuid;
  usuario: IObjectUuid;
}
