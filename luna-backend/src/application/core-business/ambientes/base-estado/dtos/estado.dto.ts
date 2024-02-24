import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { CommonPropertyId, IEstadoModel } from '../../../(dtos)';
import { DtoProperty, ValidationContractId, ValidationContractString, createDtoPropertyMap, createDtoPropertyOptions, createValidationContract } from '../../../../../infrastructure';

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

export const EstadoDtoProperties = createDtoPropertyMap({
  ESTADO_ID: CommonPropertyId('ID IBGE do esatado.'),

  ESTADO_NOME: createDtoPropertyOptions({
    nullable: false,
    description: 'Nome oficial do estado.',

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  }),

  ESTADO_SIGLA: createDtoPropertyOptions({
    nullable: false,
    description: 'Sigla UF oficial do estado.',

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  }),
});

// ======================================================

@ObjectType('Estado')
export class EstadoDto implements IEstadoModel {
  @DtoProperty(EstadoDtoProperties.ESTADO_ID)
  id!: number;

  @DtoProperty(EstadoDtoProperties.ESTADO_NOME)
  nome!: string;

  @DtoProperty(EstadoDtoProperties.ESTADO_SIGLA)
  sigla!: string;
}

// ======================================================
