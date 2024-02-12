import { ICampusFindOneByIdInputDto } from '../campus-find-one';

export interface ICampusDeleteByIdInputDto extends ICampusFindOneByIdInputDto {
  id: string;
}
