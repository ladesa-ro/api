import { AMBIENTE_CREATE } from './ambiente-create.operation';
import { AMBIENTE_DELETE_ONE_BY_ID } from './ambiente-delete-one.operation';
import { AMBIENTE_FIND_ALL } from './ambiente-find-all.operation';
import { AMBIENTE_FIND_ONE_BY_ID } from './ambiente-find-one.operation';
import { AMBIENTE_GET_IMAGEM_CAPA } from './ambiente-get-imagem-capa.operation';
import { AMBIENTE_UPDATE } from './ambiente-update.operation';

export const AmbienteOperations = {
  // ===============================
  AMBIENTE_FIND_ALL: AMBIENTE_FIND_ALL,
  // ===============================
  AMBIENTE_FIND_ONE_BY_ID: AMBIENTE_FIND_ONE_BY_ID,
  // ===============================
  AMBIENTE_GET_IMAGEM_CAPA: AMBIENTE_GET_IMAGEM_CAPA,
  // ===============================
  AMBIENTE_CREATE: AMBIENTE_CREATE,
  // ===============================
  AMBIENTE_UPDATE: AMBIENTE_UPDATE,
  // ===============================
  AMBIENTE_DELETE_ONE_BY_ID: AMBIENTE_DELETE_ONE_BY_ID,
  // ===============================
};
