import { IPaginatedResultDto } from '../../../../(core)';
import { IBlocoFindOneResultDto } from '../bloco-find-one';

export interface IBlocoFindAllResultDto extends IPaginatedResultDto<IBlocoFindOneResultDto> {}
