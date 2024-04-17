import { ICampusFindOneByIdInputDto } from '../campus-find-one';

export interface ICampusDeleteOneByIdInputDto extends ICampusFindOneByIdInputDto {
  id: string;
}
