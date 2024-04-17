import { IPaginatedResultDto } from '../../../..';
import { IDiarioFindOneResultDto } from '../diario-find-one';

export interface IDiarioFindAllResultDto extends IPaginatedResultDto<IDiarioFindOneResultDto> {}
