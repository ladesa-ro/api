import { EtapaEntity } from "../../entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createEtapaRepository = createRepositoryFactory((ds) => ds.getRepository(EtapaEntity).extend({}));

export type EtapaRepository = IRepositoryFactoryOutput<typeof createEtapaRepository>;
