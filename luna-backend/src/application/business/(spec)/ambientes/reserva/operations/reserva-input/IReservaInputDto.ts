import { IObjectUuid } from '../../../../(core)';
import { IReservaModel } from '../../IReservaModel';

export interface IReservaInputDto extends Pick<IReservaModel, 'situacao' | 'motivo' | 'tipo' | 'dataInicio' | 'dataTermino' > {
  ambiente: IObjectUuid
  usuario: IObjectUuid
}
