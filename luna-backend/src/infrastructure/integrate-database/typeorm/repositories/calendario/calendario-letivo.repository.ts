import { CalendarioLetivoEntity } from "../../entities/calendario/calendario-letivo.entity";
import { createRepositoryFactory, IRepositoryFactoryOutput } from "../helpers/create-repository-factory";

export const createCalendarioLetivoRepository = createRepositoryFactory((ds) => ds.getRepository(CalendarioLetivoEntity).extend({


}));

export type CalendarioLetivoRepository = IRepositoryFactoryOutput<typeof createCalendarioLetivoRepository>;