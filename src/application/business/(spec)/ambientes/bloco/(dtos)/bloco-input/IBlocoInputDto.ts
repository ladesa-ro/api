import { IObjectUuid } from '../../../../(core)';
import { IBlocoModel } from '../../IBlocoModel';

export interface IBlocoInputDto extends Pick<IBlocoModel, 'nome' | 'codigo'> {
  campus: IObjectUuid;
}
