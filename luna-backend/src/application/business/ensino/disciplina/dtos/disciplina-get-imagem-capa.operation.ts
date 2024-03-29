import { ValidationContractUuid, createDtoOperationOptions } from '../../../../../infrastructure';

// ======================================================

export const DISCIPLINA_GET_IMAGEM_CAPA = createDtoOperationOptions({
  description: 'Obtêm a imagem de capa da disciplina.',

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
