import { CampusPossuiModalidadeEntity } from "../../entities/ensino/campus_possui_modalidade.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createCampusPossuiModalidadeRepository = createRepositoryFactory((ds) => ds.getRepository(CampusPossuiModalidadeEntity).extend({}));

export type CampusPossuiModalidadeRepository = IRepositoryFactoryOutput<typeof createCampusPossuiModalidadeRepository>;
