import { ICampusInputDto } from 'application/business/(spec)/ambientes';
import { IModalidadeInputDto } from 'application/business/(spec)/ensino';
import { ICalendarioLetivoFindOneByIdInputDto } from '../calendario-letivo-find-one';
import { ICalendarioLetivoInputDto } from './ICalendarioLetivoInputDto';

export interface ICalendarioLetivoUpdateDto extends ICalendarioLetivoFindOneByIdInputDto, Partial<ICalendarioLetivoInputDto> {
  //

  id: string;

  //

  nome?: string;
  ano?: number;

  //

  campus?: ICampusInputDto;
  modalidade?: IModalidadeInputDto;
}
