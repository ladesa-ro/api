import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CalendarioLetivoDtoProperties, CalendarioLetivoCreateInputDtoValidationContract } from './calendario-letivo.dto';

// ======================================================

export const CalendarioLetivoInputDtoValidationContract = createValidationContract(() => {
  const schema = CalendarioLetivoCreateInputDtoValidationContract();

  return yup.object().shape({
    //

    nome: getSchemaField(schema, 'nome'),
    nomeAbreviado: getSchemaField(schema, 'nomeAbreviado'),

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
  campus!: Dto.ICampusModel;


  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_MODALIDADE_INPUT)
  modalidade!: Dto.IModalidadeModel;

  //
}
