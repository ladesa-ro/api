import { IReservaFindOneByIdInputDto } from '../reserva-find-one';

export interface IReservaDeleteOneByIdInputDto extends IReservaFindOneByIdInputDto {
  id: string;
}
