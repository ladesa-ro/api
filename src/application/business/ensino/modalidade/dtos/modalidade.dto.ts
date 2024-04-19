import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { CommonPropertyUuid, DtoProperty, ValidationContractString, ValidationContractUuid, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';

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

@ObjectType('Modalidade')
export class ModalidadeDto implements Dto.IModalidadeModel {
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_ID)
  id!: string;

  //

  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_NOME)
  nome!: string;

  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_SLUG)
  slug!: string;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
