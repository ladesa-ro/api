import { ICalendarioLetivoFindOneByIdInputDto } from '../calendario-letivo-find-one';

export interface ICalendarioLetivoDeleteOneByIdInputDto extends ICalendarioLetivoFindOneByIdInputDto {
  id: string;
}
