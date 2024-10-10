import { EventoEntity } from "../../entities/calendario/evento.entity";
import { IRepositoryFactoryOutput, createRepositoryFactory } from "../helpers/create-repository-factory";

export const createEventoRepository = createRepositoryFactory((ds) => ds.getRepository(EventoEntity).extend({}));

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
