import { createDtoOperationGetFileOptions } from '../../../../legacy';
import { ValidationContractUuid } from '../../../../validacao';

export const AMBIENTE_GET_IMAGEM_CAPA = createDtoOperationGetFileOptions({
  description: 'Obtêm a imagem de capa do ambiente.',

  meta: {
    getFile: {
      mimeType: 'image/jpeg',
    },
  },

  swagger: {
    params: [
      {
        name: 'id',
        description: 'ID da disciplina.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
