import { ReservaEntity } from "../../entities/ambientes/reserva.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createReservaRepository = createRepositoryFactory((ds) => ds.getRepository(ReservaEntity).extend({}));

export type ReservaRepository = IRepositoryFactoryOutput<typeof createReservaRepository>;
