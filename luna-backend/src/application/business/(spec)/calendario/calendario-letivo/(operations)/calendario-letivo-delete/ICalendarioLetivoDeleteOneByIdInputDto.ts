import { ICalendarioLetivoFindOneByIdInputDto } from '../calendario-letivo-find-one';

export interface ICalendarioLetivoDeleteByIdInputDto extends ICalendarioLetivoFindOneByIdInputDto {
  id: string;
}
