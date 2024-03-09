import { IModalidadeModel } from '../../IModalidadeModel';

export interface IModalidadeFindOneByIdInputDto extends Pick<IModalidadeModel, 'id'> {
  id: string;
}
