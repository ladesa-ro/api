import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractObjectUuidBase, ValidationContractString, ValidationContractUuid, createValidationContract } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';

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
