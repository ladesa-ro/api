import { IPaginatedResultDto } from '../../../../(core)';
import { ICampusFindOneResultDto } from '../campus-find-one';

export interface ICampusFindAllResultDto extends IPaginatedResultDto<ICampusFindOneResultDto> {}
