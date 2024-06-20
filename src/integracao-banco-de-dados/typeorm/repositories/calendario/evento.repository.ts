import { EventoEntity } from '../../entities/calendario/evento.entity';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createEventoRepository = createRepositoryFactory((ds) => ds.getRepository(EventoEntity).extend({}));

export type EventoRepository = IRepositoryFactoryOutput<typeof createEventoRepository>;
