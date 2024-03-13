import { TurmaEntity } from '../../entities/ensino/turma.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createTurmaRepository = createRepositoryFactory((ds) => ds.getRepository(TurmaEntity).extend({}));

export type TurmaRepository = IRepositoryFactoryOutput<typeof createTurmaRepository>;
