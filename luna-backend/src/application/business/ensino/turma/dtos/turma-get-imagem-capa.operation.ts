import { ValidationContractUuid, createDtoOperationGetFileOptions } from '../../../../../infrastructure';

// ======================================================

export const TURMA_GET_IMAGEM_CAPA = createDtoOperationGetFileOptions({
  description: 'Obtêm a imagem de capa da turma.',

  meta: {
    getFile: {
      mimeType: 'image/jpeg',
    },
  },

  swagger: {
    params: [
      {
        name: 'id',
        description: 'ID da turma.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
