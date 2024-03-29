import { ValidationContractUuid, createDtoOperationOptions } from '../../../../../infrastructure';

// ======================================================

export const CURSO_GET_IMAGEM_CAPA = createDtoOperationOptions({
  description: 'Obtêm a imagem de capa do curso.',

  gql: null,

  swagger: {
    returnType: {
      schema: {
        type: 'string',
        format: 'binary',
      },
    },

    params: [
      {
        name: 'id',
        description: 'ID do bloco.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
