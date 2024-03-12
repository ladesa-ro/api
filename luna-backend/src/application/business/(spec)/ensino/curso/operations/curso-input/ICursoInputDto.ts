import { ICursoModel } from '../../ICursoModel';

export interface ICursoInputDto extends Pick<ICursoModel, never  | 'nome' | 'nomeAbreviado' | 'campus' | 'modalidade'> {
}
