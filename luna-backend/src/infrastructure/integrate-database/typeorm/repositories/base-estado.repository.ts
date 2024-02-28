import { BaseEstadoEntity } from '../entities/estado.entity';
import { IRepositoryFactoryOutput, createRepositoryFactory } from './helpers/create-repository-factory';

export const createBaseEstadoRepository = createRepositoryFactory((ds) => ds.getRepository(BaseEstadoEntity).extend({}));

export type IBaseEstadoRepository = IRepositoryFactoryOutput<typeof createBaseEstadoRepository>;
