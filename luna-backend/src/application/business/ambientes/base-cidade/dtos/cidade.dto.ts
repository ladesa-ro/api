import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { ICidadeModel, IEstadoFindOneResultDto } from '../../../(dtos)';
import { CommonPropertyId, DtoProperty, ValidationContractId, ValidationContractString, createDtoPropertyMap, createDtoPropertyOptions, createValidationContract } from '../../../../../infrastructure';
import { EstadoDto, EstadoFindOneResultDto } from '../../base-estado/dtos';

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

  CIDADE_ESTADO_OUTPUT: createDtoPropertyOptions({
    nullable: false,
    description: 'Estado brasileiro o qual a cidade pertence.',

    gql: {
      type: () => EstadoDto,
    },

    swagger: {
      type: () => EstadoFindOneResultDto,
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

  @DtoProperty(CidadeDtoProperties.CIDADE_ESTADO_OUTPUT)
  estado!: IEstadoFindOneResultDto;
}

// ======================================================
