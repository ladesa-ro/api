import { ModalidadeEntity } from '../../entities/ensino/ensino/modalidade.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createModalidadeRepository = createRepositoryFactory((ds) => ds.getRepository(ModalidadeEntity).extend({}));

export type ModalidadeRepository = IRepositoryFactoryOutput<typeof createModalidadeRepository>;
