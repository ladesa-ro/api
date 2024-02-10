import { IBaseCidadeModel } from '../../(models)';

export type IBaseCidadeFindOneResultDto = Pick<IBaseCidadeModel, 'id' | 'nome'>;
