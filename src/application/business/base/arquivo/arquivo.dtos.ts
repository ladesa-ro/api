import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass, createOperationOptionsFromOperator } from '../../../../infrastructure/utils/createDtoClass.js';
import { createValidationContract } from '../../../../infrastructure/validation/createValidationContract.js';

// ======================================================
export const ArquivoDto = createEntityDtoClass(Spec.Arquivo);
export const ArquivoFindOneResultDto = createEntityDtoClass(Spec.ArquivoFindOneByIdResult);
// ======================================================
export const ArquivoDtoValidationContract = createValidationContract(() => Spec.GetSchema(Spec.GetDeclarationValidator(Spec.Arquivo()), yup));
// ======================================================
export const ArquivoGetFile = createOperationOptionsFromOperator(Spec.ArquivoGetFileOperator());
// ======================================================
export const ArquivoOperations = {
  ArquivoGetFile: ArquivoGetFile,
};
// ======================================================
