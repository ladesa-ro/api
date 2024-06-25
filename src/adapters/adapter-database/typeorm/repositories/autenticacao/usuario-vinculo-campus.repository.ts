import { VinculoEntity } from '../../entities/autenticacao/vinculo.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createVinculoRepository = createRepositoryFactory((ds) => ds.getRepository(VinculoEntity).extend({}));

export type VinculoRepository = IRepositoryFactoryOutput<typeof createVinculoRepository>;
