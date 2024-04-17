import { IPaginatedResultDto } from '../../../..';
import { IReservaFindOneResultDto } from '../reserva-find-one';

export interface IReservaFindAllResultDto extends IPaginatedResultDto<IReservaFindOneResultDto> {}
