import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationOptions } from '../../../../../infrastructure';

// ======================================================

export const ARQUIVO_GET_FILE = createDtoOperationOptions({
  description: 'Obtêm o conteúdo de um arquivo.',

  gql: null,

  swagger: {
    returnType: '',

    params: [
      {
        name: 'id',
        description: 'ID do arquivo.',
        validationContract: ValidationContractUuid,
      },
    ],

    queries: [
      {
        name: 'acesso.recurso.nome',
        description: 'Acesso via recurso: nome',
        validationContract: () => yup.string(),
      },
      {
        name: 'acesso.recurso.id',
        description: 'Acesso via recurso: id',
        validationContract: () => yup.mixed(),
      },
    ],
  },
});

// ======================================================
