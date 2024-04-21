import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractNumber, ValidationContractString, ValidationContractUuid, createValidationContract } from '../../../../../infrastructure';
import { createEntityDtoClass } from '../../../../../infrastructure/utils/createDtoClass';

// ======================================================

export const ArquivoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    //
    nome: ValidationContractString().nullable(),
    mimeType: ValidationContractString().nullable(),
    //
    sizeBytes: ValidationContractNumber().integer().positive().required().nullable(),
    storageType: ValidationContractString().nullable(),
  });
});

// ======================================================

export const ArquivoDto = createEntityDtoClass(Spec.ArquivoDeclarationFactory);

// ======================================================
