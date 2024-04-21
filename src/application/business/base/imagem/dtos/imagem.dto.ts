import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractString, ValidationContractUuid, createValidationContract } from '../../../../../infrastructure';

// ======================================================

export const ImagemDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    descricao: ValidationContractString().nullable(),
  });
});

// ======================================================

export const ImagemDto = createEntityDtoClass(Spec.ImagemDeclarationFactory);

// ======================================================
