import { IPaginatedResultDto } from '../../../../(core)';
import { IEstadoFindOneResultDto } from '../estado-find-one';

export interface IEstadoFindAllResultDto extends IPaginatedResultDto<IEstadoFindOneResultDto> {}
