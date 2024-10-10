import { BlocoEntity } from "../../entities/ambientes/bloco.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createBlocoRepository = createRepositoryFactory((ds) => ds.getRepository(BlocoEntity).extend({}));

export type BlocoRepository = IRepositoryFactoryOutput<typeof createBlocoRepository>;
