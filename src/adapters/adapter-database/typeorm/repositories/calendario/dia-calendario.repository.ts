import { DiaCalendarioEntity } from '../../entities/calendario/dia-calendario.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createDiaCalendarioRepository = createRepositoryFactory((ds) => ds.getRepository(DiaCalendarioEntity).extend({}));

export type DiaCalendarioRepository = IRepositoryFactoryOutput<typeof createDiaCalendarioRepository>;
