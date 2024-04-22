import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { ValidationContractId, ValidationContractString, createValidationContract } from '../../../../../infrastructure';

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
