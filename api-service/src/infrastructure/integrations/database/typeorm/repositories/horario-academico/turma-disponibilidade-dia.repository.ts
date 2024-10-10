import { TurmaDisponibilidadeDiaEntity } from "../../entities";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createTurmaDisponibilidadeDiaRepository = createRepositoryFactory((ds) => ds.getRepository(TurmaDisponibilidadeDiaEntity).extend({}));

export type TurmaDisponibilidadeDiaRepository = IRepositoryFactoryOutput<typeof createTurmaDisponibilidadeDiaRepository>;
