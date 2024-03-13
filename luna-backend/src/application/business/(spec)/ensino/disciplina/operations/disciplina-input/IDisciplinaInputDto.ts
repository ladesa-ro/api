import { IDisciplinaModel } from '../../IDisciplinaModel';

export interface IDisciplinaInputDto extends Pick<IDisciplinaModel, 'nome' | 'cargaHoraria'> {}
