import { EnderecoEntity } from '../entities/endereco.entity';
import {
  IRepositoryFactoryOutput,
  createRepositoryFactory,
} from './helpers/create-repository-factory';

export const createEnderecoRepository = createRepositoryFactory((ds) =>
  ds.getRepository(EnderecoEntity).extend({}),
);

export type IEnderecoRepository = IRepositoryFactoryOutput<
  typeof createEnderecoRepository
>;
