import { IPaginatedResultDto } from '../../../../../(spec)';
import { IDiarioFindOneResultDto } from '../diario-find-one';

export interface IDiarioFindAllResultDto extends IPaginatedResultDto<IDiarioFindOneResultDto> {}
