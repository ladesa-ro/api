import { IBlocoFindOneResultDto } from '../../../bloco';
import { IAmbienteModel } from '../../IAmbienteModel';

export interface IAmbienteFindOneResultDto extends Pick<IAmbienteModel, 'id' | 'codigo' | 'capacidade' | 'nome' | 'descricao' | 'tipo'> {
  bloco: IBlocoFindOneResultDto;
}
