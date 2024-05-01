import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createValidationContract, ValidationContractString, ValidationContractUuid } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';

// ======================================================

export const ModalidadeDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //

    nome: ValidationContractString().required().nonNullable(),
    slug: ValidationContractString().required().nonNullable(),

    //
  });
});

// ======================================================

export const ModalidadeDto = createEntityDtoClass(Spec.ModalidadeDeclarationFactory);

// ======================================================
