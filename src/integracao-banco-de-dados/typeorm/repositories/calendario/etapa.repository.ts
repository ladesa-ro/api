import { EtapaEntity } from '@/integracao-banco-de-dados/typeorm/entities/calendario/etapa.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '@/integracao-banco-de-dados/typeorm/repositories/helpers/create-repository-factory';


export const createEtapaRepository = createRepositoryFactory((ds) => ds.getRepository(EtapaEntity).extend({}));

export type EtapaRepository = IRepositoryFactoryOutput<typeof createEtapaRepository>;
