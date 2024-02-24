import { IEstadoModel } from '../../IEstadoModel';

export interface IEstadoFindOneByUfInputDto {
  uf: IEstadoModel['sigla'];
}
