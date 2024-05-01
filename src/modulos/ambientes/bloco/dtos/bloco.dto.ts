import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { createValidationContract, ValidationContractUuid, ValidationContractString, ValidationContractObjectUuidBase } from '../../../../validacao';

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
