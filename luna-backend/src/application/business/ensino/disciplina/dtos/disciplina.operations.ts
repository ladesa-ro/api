import { DISCIPLINA_CREATE } from './disciplina-create.operation';
import { DISCIPLINA_DELETE_ONE_BY_ID } from './disciplina-delete-one.operation';
import { DISCIPLINA_FIND_ALL } from './disciplina-find-all.operation';
import { DISCIPLINA_FIND_ONE_BY_ID } from './disciplina-find-one.operation';
import { DISCIPLINA_UPDATE } from './disciplina-update.operation';

export const DisciplinaOperations = {
  DISCIPLINA_CREATE: DISCIPLINA_CREATE,
  DISCIPLINA_UPDATE: DISCIPLINA_UPDATE,
  DISCIPLINA_DELETE_ONE_BY_ID: DISCIPLINA_DELETE_ONE_BY_ID,
  DISCIPLINA_FIND_ALL: DISCIPLINA_FIND_ALL,
  DISCIPLINA_FIND_ONE_BY_ID: DISCIPLINA_FIND_ONE_BY_ID,
};
