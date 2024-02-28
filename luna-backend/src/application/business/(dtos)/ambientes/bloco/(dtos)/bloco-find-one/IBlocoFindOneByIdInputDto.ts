import { IBlocoModel } from '../../IBlocoModel';

export interface IBlocoFindOneByIdInputDto extends Pick<IBlocoModel, 'id'> {
  id: string;
}
