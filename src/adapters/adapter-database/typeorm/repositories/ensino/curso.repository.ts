import { CursoEntity } from '../../entities/ensino/curso.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createCursoRepository = createRepositoryFactory((ds) => ds.getRepository(CursoEntity).extend({}));

export type CursoRepository = IRepositoryFactoryOutput<typeof createCursoRepository>;
