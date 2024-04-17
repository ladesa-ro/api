import { ICampusFindOneResultDto } from 'application/business/(spec)/ambientes';
import { IModalidadeFindOneResultDto } from 'application/business/(spec)/ensino';
import { ICalendarioLetivoModel } from '../../ICalendarioLetivoModel';

export interface ICalendarioLetivoFindOneResultDto extends Pick<ICalendarioLetivoModel, 'id' | 'nome' | 'ano'> {
  campus: ICampusFindOneResultDto;
  modalidade: IModalidadeFindOneResultDto;
}
