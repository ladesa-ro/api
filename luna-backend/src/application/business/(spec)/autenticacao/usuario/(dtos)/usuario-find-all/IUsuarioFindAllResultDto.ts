import { IPaginatedResultDto } from '../../../../(core)';
import { IUsuarioFindOneResultDto } from '../usuario-find-one';

export interface IUsuarioFindAllResultDto extends IPaginatedResultDto<IUsuarioFindOneResultDto> {}
