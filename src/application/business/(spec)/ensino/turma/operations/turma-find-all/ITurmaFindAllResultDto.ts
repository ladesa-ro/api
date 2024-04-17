import { IPaginatedResultDto } from '../../../..';
import { ITurmaFindOneResultDto } from '../turma-find-one';

export interface ITurmaFindAllResultDto extends IPaginatedResultDto<ITurmaFindOneResultDto> {}
