import { IPaginatedResultDto } from '../../../../../(spec)';
import { IDiarioProfessorFindOneResultDto } from '../diario-professor-find-one';

export interface IDiarioProfessorFindAllResultDto extends IPaginatedResultDto<IDiarioProfessorFindOneResultDto> {}
