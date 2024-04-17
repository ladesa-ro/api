import { ICursoModel } from '../../ICursoModel';

export interface ICursoFindOneByIdInputDto extends Pick<ICursoModel, 'id'> {
  id: string;
}
