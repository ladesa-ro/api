import { InputType, ObjectType } from '@nestjs/graphql';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CalendarioLetivoDto, CalendarioLetivoDtoProperties, CalendarioLetivoDtoValidationContract } from './calendario-letivo.dto';

//====================================================

@ObjectType('CalendarioLetivoFindOneResultDto')
export class CalendarioLetivoFindOneResultDto implements Dto.ICalendarioLetivoFindOneResultDto {
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

  //
}

// ======================================================

export const CalendarioLetivoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CalendarioLetivoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('CalendarioLetivoFindOneByIdInputDto')
export class CalendarioLetivoFindOneByIdInputDto implements Dto.ICalendarioLetivoFindOneByIdInputDto {
  @DtoProperty(CalendarioLetivoDtoProperties.CALENDARIO_LETIVO_ID)
  id!: string;
}

export const CALENDARIO_LETIVO_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a "calendario letivo" por ID.',

  gql: {
    name: 'calendarioLetivoFindOneById',

    inputDtoType: () => CalendarioLetivoFindOneByIdInputDto,
    inputDtoValidationContract: CalendarioLetivoFindOneByIdInputValidationContract,

    returnType: () => CalendarioLetivoDto,
  },

  swagger: {
    returnType: CalendarioLetivoFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da calendario.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
