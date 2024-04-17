import { IPaginatedResultDto } from '../../../..';
import { ICursoFindOneResultDto } from '../curso-find-one';

export interface ICursoFindAllResultDto extends IPaginatedResultDto<ICursoFindOneResultDto> {}
