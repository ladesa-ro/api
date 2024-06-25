import { TurmaDisponibilidadeEntity } from '../../entities';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createTurmaDisponibilidadeRepository = createRepositoryFactory((ds) => ds.getRepository(TurmaDisponibilidadeEntity).extend({}));

export type TurmaDisponibilidadeRepository = IRepositoryFactoryOutput<typeof createTurmaDisponibilidadeRepository>;
