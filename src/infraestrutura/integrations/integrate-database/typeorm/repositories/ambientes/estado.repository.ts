import { EstadoEntity } from '../../entities/ambientes/estado.entity';
import { IRepositoryFactoryOutput, createRepositoryFactory } from '../helpers/create-repository-factory';

export const createEstadoRepository = createRepositoryFactory((ds) => ds.getRepository(EstadoEntity).extend({}));

export type IEstadoRepository = IRepositoryFactoryOutput<typeof createEstadoRepository>;
