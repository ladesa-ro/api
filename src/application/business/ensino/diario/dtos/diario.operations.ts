import { DIARIO_FIND_ONE_BY_ID } from './diario-find-one.operation';
import { DIARIO_FIND_ALL } from './diario-find-all.operation';
import { DIARIO_DELETE_ONE_BY_ID } from './diario-delete-one.operation';
import { DIARIO_UPDATE } from './diario-update.operation';
import { DIARIO_CREATE } from './diario-create.operation';
export const DiarioOperations = {
  DIARIO_CREATE: DIARIO_CREATE,
  DIARIO_UPDATE: DIARIO_UPDATE,
  DIARIO_DELETE_ONE_BY_ID: DIARIO_DELETE_ONE_BY_ID,
  DIARIO_FIND_ALL: DIARIO_FIND_ALL,
  DIARIO_FIND_ONE_BY_ID: DIARIO_FIND_ONE_BY_ID,
};
