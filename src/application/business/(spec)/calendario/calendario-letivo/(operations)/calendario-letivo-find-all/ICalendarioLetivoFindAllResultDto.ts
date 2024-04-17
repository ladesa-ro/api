import { IPaginatedResultDto } from '../../../../(core)';
import { ICalendarioLetivoFindOneResultDto } from '../calendario-letivo-find-one';

export interface ICalendarioLetivoFindAllResultDto extends IPaginatedResultDto<ICalendarioLetivoFindOneResultDto> {}
