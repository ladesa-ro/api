import { CampusPossuiModalidadeEntity } from '../../entities/ensino/campus_possui_modalidade.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createCampusPossuiModalidadeRepository = createRepositoryFactory((ds) => ds.getRepository(CampusPossuiModalidadeEntity).extend({}));

export type CampusPossuiModalidadeRepository = IRepositoryFactoryOutput<typeof createCampusPossuiModalidadeRepository>;
