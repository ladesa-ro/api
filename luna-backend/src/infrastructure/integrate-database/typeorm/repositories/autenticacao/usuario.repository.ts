import { UsuarioEntity } from '../../entities/autenticacao/usuario.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createUsuarioRepository = createRepositoryFactory((ds) => ds.getRepository(UsuarioEntity).extend({}));

export type UsuarioRepository = IRepositoryFactoryOutput<typeof createUsuarioRepository>;
