import { ICampusFindOneResultDto, IUsuarioFindOneResultDto } from 'application/business/(dtos)';
import { IUsuarioVinculoCampusModel } from '../../IUsuarioVinculoCampusModel';

export interface IUsuarioVinculoCampusFindOneResultDto extends Pick<IUsuarioVinculoCampusModel, 'ativo' | 'cargo'> {
  usuario: IUsuarioFindOneResultDto;
  campus: ICampusFindOneResultDto;
}
