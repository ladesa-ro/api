import { ModalidadeEntity } from "../../entities/ensino/modalidade.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createModalidadeRepository = createRepositoryFactory((ds) => ds.getRepository(ModalidadeEntity).extend({}));

export type ModalidadeRepository = IRepositoryFactoryOutput<typeof createModalidadeRepository>;
