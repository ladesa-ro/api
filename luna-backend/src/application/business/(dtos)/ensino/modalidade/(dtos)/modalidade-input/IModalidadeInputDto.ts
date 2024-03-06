import { IObjectUuid } from '../../../../(core)';
import { IModalidadeModel } from '../../IModalidadeModel';

export interface IModalidadeInputDto extends Pick<IModalidadeModel, 'nome' | 'slug'> {
    campus: IObjectUuid;
}
