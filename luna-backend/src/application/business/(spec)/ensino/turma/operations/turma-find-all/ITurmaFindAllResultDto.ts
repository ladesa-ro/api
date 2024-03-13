import { IPaginatedResultDto } from '../../../../../(spec)';
import { ITurmaFindOneResultDto } from '../turma-find-one';

export interface ITurmaFindAllResultDto extends IPaginatedResultDto<ITurmaFindOneResultDto> {}
