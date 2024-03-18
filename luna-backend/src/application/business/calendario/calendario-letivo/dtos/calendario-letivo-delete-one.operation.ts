import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CalendarioLetivoDtoProperties, CalendarioLetivoDtoValidationContract } from './calendario-letivo.dto';

// ======================================================

export const CalendarioLetivoDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CalendarioLetivoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('CalendarioLetivoDeleteOneByIdInputDto')
export class CalendarioLetivoDeleteOneByIdInputDto implements Dto.ICalendarioLetivoDeleteOneByIdInputDto {
  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ID)
  id!: string;
}

// ======================================================

export const CALENDARIO_LETIVO_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de "CalendarioLetivo" por ID.',

  gql: {
    name: 'CalendarioLetivoDeleteOneById',

    inputDtoType: () => CalendarioLetivoDeleteOneByIdInputDto,
    inputDtoValidationContract: CalendarioLetivoDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID de "CalendarioLetivo".',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
