import { InputType, ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractId, createDtoOperationOptions, createValidationContract, createValidationContractPickField, getSchemaField } from '../../../../../infrastructure';
import { EstadoDto, EstadoDtoProperties, EstadoDtoValidationContract } from './estado.dto';

// ======================================================

@ObjectType('EstadoFindOneResult')
export class EstadoFindOneResultDto implements Dto.IEstadoFindOneResultDto {
  @DtoProperty(EstadoDtoProperties.ESTADO_ID)
  id!: number;

  // ==============

  @DtoProperty(EstadoDtoProperties.ESTADO_NOME)
  nome!: string;

  @DtoProperty(EstadoDtoProperties.ESTADO_SIGLA)
  sigla!: string;
}

// ======================================================

export const EstadoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(EstadoDtoValidationContract(), 'id'),
  }),
);

// ================

@InputType('EstadoFindOneByIdInputDto')
export class EstadoFindOneByIdInputDto implements Dto.IEstadoFindOneByIdInputDto {
  @DtoProperty(EstadoDtoProperties.ESTADO_ID)
  id!: number;
}

// ================

export const ESTADO_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um estado por ID IBGE do estado.',

  gql: {
    name: 'estadoFindOneById',

    inputDtoType: () => EstadoFindOneByIdInputDto,
    inputDtoValidationContract: EstadoFindOneByIdInputValidationContract,

    returnType: () => EstadoDto,
  },

  swagger: {
    returnType: EstadoFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID IBGE do estado.',
        validationContract: ValidationContractId,
      },
    ],
  },
});

// ======================================================

export const EstadoFindOneByUfInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    uf: getSchemaField(EstadoDtoValidationContract(), 'sigla'),
  }),
);

// ================

export const ESTADO_FIND_ONE_BY_UF = createDtoOperationOptions({
  description: 'Realiza a consulta a um estado por sigla da UF.',

  gql: {
    name: 'estadoFindOneByUf',

    inputDtoType: () => EstadoFindOneByUfInputDto,
    inputDtoValidationContract: EstadoFindOneByUfInputValidationContract,

    returnType: () => EstadoDto,
  },

  swagger: {
    returnType: EstadoFindOneResultDto,

    params: [
      {
        name: 'uf',
        description: 'Sigla UF do estado.',
        validationContract: createValidationContractPickField(EstadoFindOneByUfInputValidationContract, 'uf'),
      },
    ],
  },
});

// ================

@InputType('EstadoFindOneByUfInputDto')
export class EstadoFindOneByUfInputDto implements Dto.IEstadoFindOneByUfInputDto {
  @DtoProperty(EstadoDtoProperties.ESTADO_SIGLA)
  uf!: string;
}

// ======================================================
