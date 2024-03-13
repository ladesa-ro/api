import { IPaginatedResultDto } from '../../../../../(spec)';
import { IDisciplinaFindOneResultDto } from '../disciplina-find-one';

export interface IDisciplinaFindAllResultDto extends IPaginatedResultDto<IDisciplinaFindOneResultDto> {}
