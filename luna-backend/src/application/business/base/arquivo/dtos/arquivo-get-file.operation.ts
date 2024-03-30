import * as yup from 'yup';
import { ValidationContractUuid, createDtoOperationGetFileOptions } from '../../../../../infrastructure';

// ======================================================

export const ARQUIVO_GET_FILE = createDtoOperationGetFileOptions({
  description: 'Obtêm o conteúdo de um arquivo.',

  swagger: {
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
