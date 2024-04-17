import { DiarioProfessorEntity } from '../../entities/ensino/diario_professor.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => ds.getRepository(DiarioProfessorEntity).extend({}));

export type DiarioProfessorRepository = IRepositoryFactoryOutput<typeof createDiarioProfessorRepository>;
