import { TurmaDisponibilidadeDiaEntity } from '../../entities';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createTurmaDisponibilidadeDiaRepository = createRepositoryFactory((ds) => ds.getRepository(TurmaDisponibilidadeDiaEntity).extend({}));

export type TurmaDisponibilidadeDiaRepository = IRepositoryFactoryOutput<typeof createTurmaDisponibilidadeDiaRepository>;
