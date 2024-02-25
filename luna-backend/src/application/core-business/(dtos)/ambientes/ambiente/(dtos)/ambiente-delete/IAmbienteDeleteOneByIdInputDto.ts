import { IAmbienteFindOneByIdInputDto } from '../ambiente-find-one';

export interface IAmbienteDeleteOneByIdInputDto extends IAmbienteFindOneByIdInputDto {
  id: string;
}
