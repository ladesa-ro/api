import { IPaginatedResultDto } from '../../../../../(spec)';
import { ICursoFindOneResultDto } from '../curso-find-one';

export interface ICursoFindAllResultDto extends IPaginatedResultDto<ICursoFindOneResultDto> {}
