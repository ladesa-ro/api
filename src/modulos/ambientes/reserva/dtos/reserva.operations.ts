import { RESERVA_CREATE } from './reserva-create.operation';
import { RESERVA_DELETE_ONE_BY_ID } from './reserva-delete-one.operation';
import { RESERVA_FIND_ALL } from './reserva-find-all.operation';
import { RESERVA_FIND_ONE_BY_ID } from './reserva-find-one.operation';
import { RESERVA_UPDATE } from './reserva-update.operation';

export const ReservaOperations = {
  RESERVA_CREATE: RESERVA_CREATE,
  RESERVA_UPDATE: RESERVA_UPDATE,
  RESERVA_DELETE_ONE_BY_ID: RESERVA_DELETE_ONE_BY_ID,
  RESERVA_FIND_ALL: RESERVA_FIND_ALL,
  RESERVA_FIND_ONE_BY_ID: RESERVA_FIND_ONE_BY_ID,
};
