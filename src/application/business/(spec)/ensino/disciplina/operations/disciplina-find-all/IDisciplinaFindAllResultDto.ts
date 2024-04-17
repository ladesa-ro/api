import { IPaginatedResultDto } from '../../../..';
import { IDisciplinaFindOneResultDto } from '../disciplina-find-one';

export interface IDisciplinaFindAllResultDto extends IPaginatedResultDto<IDisciplinaFindOneResultDto> {}
