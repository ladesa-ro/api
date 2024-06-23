import { DiarioEntity } from '../../entities';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createDiarioRepository = createRepositoryFactory((ds) => ds.getRepository(DiarioEntity).extend({}));

export type DiarioRepository = IRepositoryFactoryOutput<typeof createDiarioRepository>;
