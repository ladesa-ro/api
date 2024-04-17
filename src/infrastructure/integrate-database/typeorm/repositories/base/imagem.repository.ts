import { ImagemEntity } from '../../entities/base/imagem.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createImagemRepository = createRepositoryFactory((ds) => ds.getRepository(ImagemEntity).extend({}));

export type ImagemRepository = IRepositoryFactoryOutput<typeof createImagemRepository>;
