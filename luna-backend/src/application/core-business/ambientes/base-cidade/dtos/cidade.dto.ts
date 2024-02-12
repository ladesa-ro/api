import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { CommonPropertyId, ICidadeModel } from '../../../(dtos)';
import {
  DtoProperty,
  ValidationContractId,
  ValidationContractString,
  createDtoPropertyMap,
  createDtoPropertyOptions,
  createValidationContract,
} from '../../../../../infrastructure';

// ======================================================

export const CidadeDtoValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: ValidationContractId(),
    nome: ValidationContractString(),
  }),
);

// ======================================================

export const CidadeDtoProperties = createDtoPropertyMap({
  CIDADE_ID: CommonPropertyId('ID IBGE da cidade.'),

  CIDADE_NOME: createDtoPropertyOptions({
    nullable: false,
    description: 'Nome oficial da cidade.',

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  }),
});

// ======================================================

@ObjectType('Cidade')
export class CidadeDto implements ICidadeModel {
  @DtoProperty(CidadeDtoProperties.CIDADE_ID)
  id!: number;

  @DtoProperty(CidadeDtoProperties.CIDADE_NOME)
  nome!: string;
}

// ======================================================
