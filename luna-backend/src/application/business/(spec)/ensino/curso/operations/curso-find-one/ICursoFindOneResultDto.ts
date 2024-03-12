import { ICursoModel } from "../../../../../(spec)";

export interface ICursoFindOneResultDto extends Pick<ICursoModel, 'id' | 'nome' | 'nomeAbreviado' | 'campus' | 'modalidade'> {
}
