import { IEstadoModel } from '../../(models)';

export interface IEstadoFindOneByUfInputDto {
  uf: IEstadoModel['sigla'];
}
