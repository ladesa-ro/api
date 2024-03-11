import { IObjectUuid } from 'application/business/(spec)';

export interface IUsuarioVinculoCampusSetVinculosInputDto {
  campus: IObjectUuid;
  usuario: IObjectUuid;

  cargos: string[];
}
