import { IBaseEstadoModel } from '../../../(models)';

export interface IBaseEstadoFindOneByUfInputDto {
  uf: IBaseEstadoModel['sigla'];
}
