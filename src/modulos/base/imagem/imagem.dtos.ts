import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../legacy/utils';
import { createValidationContract, ValidationContractString, ValidationContractUuid } from '../../../validacao';

// ======================================================

export const ImagemDto = createEntityDtoClass(Spec.Imagem);
export const ImagemFindOneResultDto = createEntityDtoClass(Spec.ImagemFindOneResult, 'output');

// ======================================================

export const ImagemDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    descricao: ValidationContractString().nullable(),
  });
});

// ======================================================
