import { ITurmaModel } from '../../ITurmaModel';

export interface ITurmaFindOneByIdInputDto extends Pick<ITurmaModel, 'id'> {
  id: string;
}
