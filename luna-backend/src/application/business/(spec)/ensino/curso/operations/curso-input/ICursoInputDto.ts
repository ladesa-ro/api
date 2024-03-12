import { IObjectUuid } from '../../../../(core)';
import { ICursoModel } from '../../ICursoModel';

export interface ICursoInputDto extends Pick<ICursoModel, 'nome' | 'nomeAbreviado'> {
  campus: IObjectUuid;
  modalidade: IObjectUuid;
}
