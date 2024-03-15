import { IUsuarioFindOneResultDto } from '../../../../autenticacao';
import { IAmbienteFindOneResultDto } from '../../../ambiente';
import { IReservaModel } from '../../IReservaModel';

export interface IReservaFindOneResultDto extends Pick<IReservaModel, 'id' | 'situacao' | 'motivo' | 'tipo' | 'dataInicio' | 'dataTermino' > {
  usuario: IUsuarioFindOneResultDto;
  ambiente: IAmbienteFindOneResultDto;
}
