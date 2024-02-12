import { ICidadeModel } from '../../ICidadeModel';

export interface ICidadeFindOneByIdInputDto extends Pick<ICidadeModel, 'id'> {
  id: number;
}
