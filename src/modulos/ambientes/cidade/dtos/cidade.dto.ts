import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationContractId, ValidationContractString, createValidationContract } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';

// ======================================================

export const CidadeDtoValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: ValidationContractId(),
    nome: ValidationContractString(),
  }),
);

// ======================================================

export const CidadeDto = createEntityDtoClass(Spec.CidadeDeclarationFactory);

// ======================================================
