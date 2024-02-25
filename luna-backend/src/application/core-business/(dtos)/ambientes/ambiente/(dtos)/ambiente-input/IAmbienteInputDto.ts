import { IObjectUuid } from '../../../../(core)';
import { IAmbienteModel } from '../../IAmbienteModel';

export interface IAmbienteInputDto extends Pick<IAmbienteModel, 'nome' | 'descricao' | 'codigo' | 'capacidade' | 'tipo'> {
  bloco: IObjectUuid;
}
