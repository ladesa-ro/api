import { IObjectUuid } from 'application/business/(dtos)';

export interface IUsuarioVinculoCampusSetVinculosInputDto {
  campus: IObjectUuid;
  usuario: IObjectUuid;

  cargos: string[];
}
