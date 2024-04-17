import { ICalendarioLetivoModel } from '../../ICalendarioLetivoModel';

export interface ICalendarioLetivoFindOneByIdInputDto extends Pick<ICalendarioLetivoModel, 'id'> {
  id: string;
}
