import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { CommonPropertyUuid, ValidationContractString, ValidationContractUuid, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';

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

export const ModalidadeDtoProperties = createDtoPropertyMap({
  MODALIDADE_ID: CommonPropertyUuid('ID da Modalidade'),

  MODALIDADE_NOME: {
    nullable: false,
    description: 'Nome da Modalidade.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  MODALIDADE_SLUG: {
    nullable: false,
    description: 'Slug da Modalidade.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
});

// ======================================================

export const ModalidadeDto = createEntityDtoClass(Spec.ModalidadeDeclarationFactory);

// ======================================================
