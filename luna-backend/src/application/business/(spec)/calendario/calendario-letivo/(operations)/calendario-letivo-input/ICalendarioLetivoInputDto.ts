import { IObjectUuid } from '../../../../(core)';
import { ICalendarioLetivoModel } from '../../ICalendarioLetivoModel';

export interface ICalendarioLetivoInputDto extends Pick<ICalendarioLetivoModel, 'nome' | 'ano'> {
  campus: IObjectUuid;
  modalidade: IObjectUuid;
}
