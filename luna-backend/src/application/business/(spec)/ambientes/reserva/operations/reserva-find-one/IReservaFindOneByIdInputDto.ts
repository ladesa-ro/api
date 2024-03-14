import { IReservaModel } from '../../IReservaModel';

export interface IReservaFindOneByIdInputDto extends Pick<IReservaModel, 'id'> {
  id: string;
}
