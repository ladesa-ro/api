import { IObjectUuid } from '../../../../(core)';
import { ITurmaModel } from '../../ITurmaModel';

export interface ITurmaInputDto extends Pick<ITurmaModel, 'periodo' | 'grupo' | 'nome'> {
  ambientePadraoAula: IObjectUuid | null;
  curso: IObjectUuid;
}
