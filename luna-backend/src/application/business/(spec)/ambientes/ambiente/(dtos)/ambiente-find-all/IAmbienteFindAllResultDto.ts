import { IPaginatedResultDto } from '../../../../(core)';
import { IAmbienteFindOneResultDto } from '../ambiente-find-one';

export interface IAmbienteFindAllResultDto extends IPaginatedResultDto<IAmbienteFindOneResultDto> {}
