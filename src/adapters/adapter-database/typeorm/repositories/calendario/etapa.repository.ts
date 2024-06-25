import { EtapaEntity } from '@/adapters/adapter-database/typeorm/entities/calendario/etapa.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '@/adapters/adapter-database/typeorm/repositories/helpers/create-repository-factory';

export const createEtapaRepository = createRepositoryFactory((ds) => ds.getRepository(EtapaEntity).extend({}));

export type EtapaRepository = IRepositoryFactoryOutput<typeof createEtapaRepository>;
