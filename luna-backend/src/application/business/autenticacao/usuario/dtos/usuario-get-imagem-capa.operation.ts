import { ValidationContractUuid, createDtoOperationGetFileOptions } from '../../../../../infrastructure';

// ======================================================

export const USUARIO_GET_IMAGEM_CAPA = createDtoOperationGetFileOptions({
  description: 'Obtêm a imagem de capa do usuário.',

  swagger: {
    params: [
      {
        name: 'id',
        description: 'ID do usuário.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
