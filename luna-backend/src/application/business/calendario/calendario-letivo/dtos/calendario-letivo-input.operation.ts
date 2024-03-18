import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CalendarioLetivoDtoProperties, CalendarioLetivoDtoValidationContract } from './calendario-letivo.dto';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';

// ======================================================

export const CalendarioLetivoInputDtoValidationContract = createValidationContract(() => {
  const schema = CalendarioLetivoDtoValidationContract();

  return yup.object().shape({
    //

    nome: getSchemaField(schema, 'nome'),
    nomeAbreviado: getSchemaField(schema, 'nomeAbreviado'),

    campus: getSchemaField(schema, 'campus'),
    modalidade: getSchemaField(schema, 'modalidade'),

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

  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_CAMPUS_OUTPUT)
  campus!: CampusEntity;


  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_MODALIDADE_OUTPUT)
  modalidade!: ModalidadeEntity;

  //
}
