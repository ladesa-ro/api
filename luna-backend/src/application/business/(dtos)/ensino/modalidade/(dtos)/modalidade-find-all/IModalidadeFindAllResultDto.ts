import { IPaginatedResultDto } from '../../../../(core)';
import { IModalidadeFindOneResultDto } from '../modalidade-find-one';

export interface IModalidadeFindAllResultDto extends IPaginatedResultDto<IModalidadeFindOneResultDto> { }
