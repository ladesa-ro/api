import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractNumber, ValidationContractString, ValidationContractUuid, createValidationContract } from '../../../../infrastructure';
import { createEntityDtoClass } from '../../../../infrastructure/utils/createDtoClass';

// ======================================================
export const ImagemArquivoDto = createEntityDtoClass(Spec.ImagemArquivo, 'output');
export const ImagemArquivoFindOneResultDto = createEntityDtoClass(Spec.ImagemArquivoFindOneByIdResult, 'output');
// ======================================================

export const ImagemDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    largura: ValidationContractNumber().integer().positive().required().nonNullable(),
    altura: ValidationContractNumber().integer().positive().required().nonNullable(),
    //
    formato: ValidationContractString().required().nonNullable(),
    mimeType: ValidationContractString().required().nonNullable(),
  });
});

// ======================================================

export const ImagemArquivoOperations = {};
