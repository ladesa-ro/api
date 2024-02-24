import { ICampusModel } from '../../ICampusModel';

export interface ICampusFindOneByIdInputDto extends Pick<ICampusModel, 'id'> {
  id: string;
}
