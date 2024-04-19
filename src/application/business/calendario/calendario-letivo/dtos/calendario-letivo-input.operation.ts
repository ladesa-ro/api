import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CalendarioLetivoDtoProperties, CalendarioLetivoDtoValidationContract } from './calendario-letivo.dto';

// ======================================================

export const CalendarioLetivoInputDtoValidationContract = createValidationContract(() => {
  const schema = CalendarioLetivoDtoValidationContract();

  return yup.object().shape({
    //
    nome: getSchemaField(schema, 'nome'),
    ano: getSchemaField(schema, 'ano'),
    //
  });
});

// ======================================================

@InputType('CalendarioLetivoInputDto')
export class CalendarioLetivoInputDto implements Dto.ICalendarioLetivoInputDto {
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
