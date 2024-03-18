import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaSubpath } from '../../../../../infrastructure';
import { CalendarioLetivoFindOneByIdInputValidationContract, CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation'
import { CalendarioLetivoInputDtoValidationContract } from './calendario-letivo-input.operation';
import { CalendarioLetivoDto, CalendarioLetivoDtoProperties } from './calendario-letivo.dto';
import { ICalendarioLetivoUpdateDto } from 'application/business/(spec)';

// ======================================================

export const CalendarioLetivoUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = CalendarioLetivoInputDtoValidationContract().partial();
  return (
    yup
      //
      .object()
      .concat(CalendarioLetivoFindOneByIdInputValidationContract())
      .concat(schema.omit(['campus', 'modalidade']))
      .shape({
        campus: (getSchemaSubpath(schema, 'campus') as yup.ObjectSchema<any, any>)
          .nonNullable()
          .optional()
          .default(() => undefined),

        modalidade: (getSchemaSubpath(schema, 'modalidade') as yup.ObjectSchema<any, any>)
          .nonNullable()
          .optional()
          .default(() => undefined),
      })
  );
});

// ======================================================

@InputType('CalendarioLetivoUpdateInputDto')
export class CalendarioLetivoUpdateInputDto implements ICalendarioLetivoUpdateDto {
  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ID)
  id!: string;

  //

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_NOME)
  nome!: string;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ANO)
  ano!: number;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_CAMPUS_OUTPUT)
  campus!: CampusEntity;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_MODALIDADE_OUTPUT)
  modalidade!: ModalidadeEntity;

  //
}

export class CalendarioLetivoUpdateWithoutIdInputDto extends OmitType(CalendarioLetivoUpdateInputDto, ['id'] as const) {}
export const CALENDARIO_LETIVO_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de "calendario letivo".',

  gql: {
    name: 'calendarioLetivoUpdate',

    inputDtoType: () => CalendarioLetivoUpdateInputDto,
    inputDtoValidationContract: CalendarioLetivoUpdateInputDtoValidationContract,

    returnType: () => CalendarioLetivoDto,
  },

  swagger: {
    inputBodyType: CalendarioLetivoUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => CalendarioLetivoUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de "Calendario Letivo".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: CalendarioLetivoFindOneResultDto,
  },
});
