import { ICampusFindOneResultDto, IUsuarioFindOneResultDto } from 'application/business/(spec)';
import { IUsuarioVinculoCampusModel } from '../../IUsuarioVinculoCampusModel';

export interface IUsuarioVinculoCampusFindOneResultDto extends Pick<IUsuarioVinculoCampusModel, 'id' | 'ativo' | 'cargo'> {
  usuario: IUsuarioFindOneResultDto;
  campus: ICampusFindOneResultDto;
}
