import { CidadeEntity } from "../../entities/ambientes/cidade.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createCidadeRepository = createRepositoryFactory((ds) => ds.getRepository(CidadeEntity).extend({}));

export type ICidadeRepository = IRepositoryFactoryOutput<typeof createCidadeRepository>;
