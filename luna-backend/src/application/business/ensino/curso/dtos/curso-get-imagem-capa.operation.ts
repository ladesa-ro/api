import { ValidationContractUuid, createDtoOperationGetFileOptions } from '../../../../../infrastructure';

// ======================================================

export const CURSO_GET_IMAGEM_CAPA = createDtoOperationGetFileOptions({
  description: 'Obtêm a imagem de capa do curso.',

  meta: {
    getFile: {
      mimeType: 'image/jpeg',
    },
  },

  swagger: {
    params: [
      {
        name: 'id',
        description: 'ID do curso.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
