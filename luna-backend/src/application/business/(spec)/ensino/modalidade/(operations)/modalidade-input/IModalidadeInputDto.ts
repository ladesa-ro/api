import { IModalidadeModel } from '../../IModalidadeModel';

export interface IModalidadeInputDto extends Pick<IModalidadeModel, 'nome' | 'slug'> {}
