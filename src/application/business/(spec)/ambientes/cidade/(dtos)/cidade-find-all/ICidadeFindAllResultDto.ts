import { IPaginatedResultDto } from '../../../../(core)';
import { ICidadeFindOneResultDto } from '../cidade-find-one';

export interface ICidadeFindAllResultDto extends IPaginatedResultDto<ICidadeFindOneResultDto> {}
