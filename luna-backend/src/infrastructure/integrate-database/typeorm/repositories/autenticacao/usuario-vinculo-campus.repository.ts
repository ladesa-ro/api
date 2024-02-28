import { UsuarioVinculoCampusEntity } from '../../entities/autenticacao/usuario-vinculo-campus.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createUsuarioVinculoCampusRepository = createRepositoryFactory((ds) => ds.getRepository(UsuarioVinculoCampusEntity).extend({}));

export type UsuarioVinculoCampusRepository = IRepositoryFactoryOutput<typeof createUsuarioVinculoCampusRepository>;
