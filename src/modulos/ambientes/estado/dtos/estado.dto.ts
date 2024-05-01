import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { createValidationContract, ValidationContractId, ValidationContractString } from '../../../../validacao';

// ======================================================

export const EstadoDtoValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: ValidationContractId(),

    nome: ValidationContractString(),

    sigla: ValidationContractString()
      .length(2)
      .uppercase()
      .test('is-valid-uf', (value) => {
        if (typeof value === 'string') {
          return value.match(/^[a-zA-Z]{2}$/) !== null;
        }

        return false;
      }),
  }),
);

// ======================================================

export const EstadoDto = createEntityDtoClass(Spec.EstadoDeclarationFactory);

// ======================================================
