import { BLOCO_CREATE } from './bloco-create.operation';
import { BLOCO_DELETE_ONE_BY_ID } from './bloco-delete-one.operation';
import { BLOCO_FIND_ALL } from './bloco-find-all.operation';
import { BLOCO_FIND_ONE_BY_ID } from './bloco-find-one.operation';
import { BLOCO_GET_IMAGEM_CAPA } from './bloco-get-imagem-capa.operation';
import { BLOCO_UPDATE } from './bloco-update.operation';

export const BlocoOperations = {
  // ===============================
  BLOCO_FIND_ALL: BLOCO_FIND_ALL,
  // ===============================
  BLOCO_FIND_ONE_BY_ID: BLOCO_FIND_ONE_BY_ID,
  BLOCO_GET_IMAGEM_CAPA: BLOCO_GET_IMAGEM_CAPA,
  // ===============================
  BLOCO_CREATE: BLOCO_CREATE,
  // ===============================
  BLOCO_UPDATE: BLOCO_UPDATE,
  // ===============================
  BLOCO_DELETE_ONE_BY_ID: BLOCO_DELETE_ONE_BY_ID,
  // ===============================
};
