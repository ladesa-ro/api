import { IModalidadeInputDto } from 'application/business/(spec)/ensino';
import { ICampusInputDto } from 'application/business/(spec)/ambientes';
import { ICalendarioLetivoModel } from '../../ICalendarioLetivoModel';

export interface ICalendarioLetivoInputDto extends Pick<ICalendarioLetivoModel, 'nome' | 'ano'> {
  campus: ICampusInputDto;
  modalidade: IModalidadeInputDto;
}
