import { DisponibilidadeProfessorEntity, HorarioGeradoEntity } from '../../entities';
import { createRepositoryFactory, IRepositoryFactoryOutput } from '../helpers/create-repository-factory';

export const createHorarioGeradoRepository = createRepositoryFactory((ds) => ds.getRepository(HorarioGeradoEntity).extend({}));

export type HorarioGeradoRepository = IRepositoryFactoryOutput<typeof createHorarioGeradoRepository>;
