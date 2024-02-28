import { IObjectUuid } from 'application/core-business/(dtos)';

export interface IUsuarioVinculoCampusSetVinculosInputDto {
  campus: IObjectUuid;
  usuario: IObjectUuid;

  cargos: string[];
}
