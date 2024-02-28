import { BaseCidadeEntity } from '../entities/cidade.entity';
import { IRepositoryFactoryOutput, createRepositoryFactory } from './helpers/create-repository-factory';

export const createBaseCidadeRepository = createRepositoryFactory((ds) => ds.getRepository(BaseCidadeEntity).extend({}));

export type IBaseCidadeRepository = IRepositoryFactoryOutput<typeof createBaseCidadeRepository>;
