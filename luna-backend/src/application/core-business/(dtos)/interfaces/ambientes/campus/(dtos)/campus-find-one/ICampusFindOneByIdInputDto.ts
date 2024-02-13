import { ICampusModel } from '../../(models)/ICampusModel';

export interface ICampusFindOneByIdInputDto extends Pick<ICampusModel, 'id'> {
  id: string;
}
