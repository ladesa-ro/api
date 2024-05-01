import { Int, ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { CampusDto, CampusFindOneResultDto } from 'application/business/ambientes/campus/dtos';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  DtoProperty,
  ObjectUuidDto,
  ValidationContractNumber,
  ValidationContractObjectUuidBase,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../infraestrutura';
import { ModalidadeDto, ModalidadeFindOneResultDto } from '../../../ensino/modalidade/dtos';

export const CalendarioLetivoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    nome: ValidationContractString().required().nonNullable(),
    ano: ValidationContractNumber().required().nonNullable(),
    //
    campus: ValidationContractObjectUuidBase({ required: false, optional: false }),
    modalidade: ValidationContractObjectUuidBase({ required: false, optional: false }),
  });
});

export const CalendarioLetivoDtoProperties = createDtoPropertyMap({
  CALENDARIO_LETIVO_ID: CommonPropertyUuid('ID do Calendario Letivo'),

  //

  CALENDARIO_LETIVO_NOME: {
    nullable: false,
    description: 'Nome do Calendario Letivo',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  CALENDARIO_LETIVO_ANO: {
    nullable: false,
    description: 'Ano do calendário.',
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },
  //==============================================
  CALENDARIO_LETIVO_CAMPUS_INPUT: {
    nullable: false,
    description: 'Campus que o calendario letivo pertence',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },

  CALENDARIO_LETIVO_CAMPUS_OUTPUT: {
    nullable: false,
    description: 'Campus que o calendario letivo pertence',
    //
    gql: {
      type: () => CampusDto,
    },
    swagger: {
      type: CampusFindOneResultDto,
    },
  },
  //============================================

  CALENDARIO_LETIVO_MODALIDADE_INPUT: {
    nullable: false,
    description: 'Modalidade a que o calendario letivo pertence.',
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },

  CALENDARIO_LETIVO_MODALIDADE_OUTPUT: {
    nullable: false,
    description: 'Modalidade a que o curso pertence.',
    //
    gql: {
      type: () => ModalidadeDto,
    },
    swagger: {
      type: ModalidadeFindOneResultDto,
    },
  },
  //============================================
});

@ObjectType('CalendarioLetivo')
export class CalendarioLetivoDto implements Dto.ICalendarioLetivoModel {
  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ID)
  id!: string;

  //

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_NOME)
  nome!: string;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ANO)
  ano!: number;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_CAMPUS_OUTPUT)
  campus!: Dto.ICampusModel;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_MODALIDADE_OUTPUT)
  modalidade!: Dto.IModalidadeModel;

  //============================================

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate;
}
