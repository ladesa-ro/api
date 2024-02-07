import { IBaseEstadoModel } from '../../(models)';

export type IBaseEstadoFindOneResultDto = Pick<
  IBaseEstadoModel,
  'id' | 'nome' | 'sigla'
>;
