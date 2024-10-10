import { DiarioProfessorEntity } from "../../entities/ensino/diario_professor.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createDiarioProfessorRepository = createRepositoryFactory((ds) => ds.getRepository(DiarioProfessorEntity).extend({}));

export type DiarioProfessorRepository = IRepositoryFactoryOutput<typeof createDiarioProfessorRepository>;
