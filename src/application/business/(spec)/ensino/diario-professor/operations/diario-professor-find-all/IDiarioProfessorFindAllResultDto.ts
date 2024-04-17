import { IPaginatedResultDto } from '../../../..';
import { IDiarioProfessorFindOneResultDto } from '../diario-professor-find-one';

export interface IDiarioProfessorFindAllResultDto extends IPaginatedResultDto<IDiarioProfessorFindOneResultDto> {}
