import { ICampusFindOneByIdInputDto } from '../../campus-find-one';
import { ICampusInputDto } from '../ICampusInputDto';

export interface ICampusUpdateDto
  extends ICampusFindOneByIdInputDto,
    ICampusInputDto {}
