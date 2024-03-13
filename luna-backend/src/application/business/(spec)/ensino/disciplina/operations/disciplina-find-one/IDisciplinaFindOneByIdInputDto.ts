import { IDisciplinaModel } from '../../IDisciplinaModel';

export interface IDisciplinaFindOneByIdInputDto extends Pick<IDisciplinaModel, 'id'> {
  id: string;
}
