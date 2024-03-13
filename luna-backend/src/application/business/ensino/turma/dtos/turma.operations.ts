import { TURMA_CREATE } from './turma-create.operation';
import { TURMA_DELETE_ONE_BY_ID } from './turma-delete-one.operation';
import { TURMA_FIND_ALL } from './turma-find-all.operation';
import { TURMA_FIND_ONE_BY_ID } from './turma-find-one.operation';
import { TURMA_UPDATE } from './turma-update.operation';

export const TurmaOperations = {
  TURMA_CREATE: TURMA_CREATE,
  TURMA_UPDATE: TURMA_UPDATE,
  TURMA_DELETE_ONE_BY_ID: TURMA_DELETE_ONE_BY_ID,
  TURMA_FIND_ALL: TURMA_FIND_ALL,
  TURMA_FIND_ONE_BY_ID: TURMA_FIND_ONE_BY_ID,
};
