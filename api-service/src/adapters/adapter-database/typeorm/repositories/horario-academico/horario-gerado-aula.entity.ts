import { HorarioGeradoAulaEntity } from '../../entities';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createHorarioGeradoAulaRepository = createRepositoryFactory((ds) => ds.getRepository(HorarioGeradoAulaEntity).extend({}));

export type HorarioGeradoAulaRepository = IRepositoryFactoryOutput<typeof createHorarioGeradoAulaRepository>;
