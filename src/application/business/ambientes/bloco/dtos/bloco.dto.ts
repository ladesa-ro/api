import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractObjectUuidBase, ValidationContractString, ValidationContractUuid, createValidationContract } from '../../../../../infrastructure';

// ======================================================

export const BlocoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    nome: ValidationContractString().required().nonNullable(),
    codigo: ValidationContractString().required().nonNullable(),
    //

    campus: ValidationContractObjectUuidBase({ required: true, optional: false }),
  });
});

// ======================================================
export const BlocoDto = createEntityDtoClass(Spec.BlocoDeclarationFactory);
// ======================================================
