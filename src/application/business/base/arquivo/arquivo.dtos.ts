import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractNumber, ValidationContractString, ValidationContractUuid, createDtoOperationGetFileOptions, createValidationContract } from '../../../../infrastructure';
import { createEntityDtoClass } from '../../../../infrastructure/utils/createDtoClass';

// ======================================================
export const ArquivoDto = createEntityDtoClass(Spec.ArquivoDeclarationFactory);
export const ArquivoFindOneResultDto = createEntityDtoClass(Spec.ArquivoFindOneByIdResultDeclaration);
// ======================================================

export const ArquivoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    nome: ValidationContractString().nullable(),
    mimeType: ValidationContractString().nullable(),
    //
    sizeBytes: ValidationContractNumber().integer().positive().required().nullable(),
    storageType: ValidationContractString().nullable(),
  });
});

// ======================================================

export const ARQUIVO_GET_FILE = createDtoOperationGetFileOptions({
  description: 'Obtêm o conteúdo de um arquivo.',

  meta: {
    getFile: {
      mimeType: 'application/octet-stream',
    },
  },

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

export const ArquivoOperations = {
  ARQUIVO_GET_FILE: ARQUIVO_GET_FILE,
};

// ======================================================
