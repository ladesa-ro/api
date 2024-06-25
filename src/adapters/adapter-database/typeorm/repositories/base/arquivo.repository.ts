import { ArquivoEntity } from '../../entities/base/arquivo.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createArquivoRepository = createRepositoryFactory((ds) => ds.getRepository(ArquivoEntity).extend({}));

export type ArquivoRepository = IRepositoryFactoryOutput<typeof createArquivoRepository>;
