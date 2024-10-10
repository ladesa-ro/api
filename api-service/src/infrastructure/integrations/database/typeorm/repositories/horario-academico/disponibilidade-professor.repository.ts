import { DisponibilidadeProfessorEntity } from "../../entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createDisponibilidadeProfessorRepository = createRepositoryFactory((ds) => ds.getRepository(DisponibilidadeProfessorEntity).extend({}));

export type DisponibilidadeProfessorRepository = IRepositoryFactoryOutput<typeof createDisponibilidadeProfessorRepository>;
