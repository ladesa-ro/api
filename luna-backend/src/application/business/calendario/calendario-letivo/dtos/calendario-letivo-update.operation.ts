import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as Dto from 'application/business/(spec)';
import * as yup from 'yup';
import { DtoProperty, ValidationContractObjectUuidBase, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { CalendarioLetivoFindOneByIdInputValidationContract, CalendarioLetivoFindOneResultDto } from './calendario-letivo-find-one.operation';
import { CalendarioLetivoInputDtoValidationContract } from './calendario-letivo-input.operation';
import { CalendarioLetivoDto, CalendarioLetivoDtoProperties } from './calendario-letivo.dto';

// ======================================================

export const CalendarioLetivoUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = CalendarioLetivoInputDtoValidationContract();

  return (
    yup
      //
      .object()
      .concat(CalendarioLetivoFindOneByIdInputValidationContract())
      .concat(schema.pick(['nome', 'ano']).partial())
      .shape({
        campus: ValidationContractObjectUuidBase({ required: true, optional: true }),
        modalidade: ValidationContractObjectUuidBase({ required: true, optional: true }),
      })
  );
});

// ======================================================

@InputType('CalendarioLetivoUpdateInputDto')
export class CalendarioLetivoUpdateInputDto implements Dto.ICalendarioLetivoUpdateDto {
  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ID)
  id!: string;

  //

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_NOME)
  nome!: string;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ANO)
  ano!: number;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_CAMPUS_INPUT)
  campus!: Dto.IObjectUuid;

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_MODALIDADE_INPUT)
  modalidade!: Dto.IObjectUuid;

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
