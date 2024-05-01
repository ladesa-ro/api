import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import { IDisciplinaUpdateDto } from '@sisgea/spec';
import * as yup from 'yup';
import { createDtoOperationOptions, createValidationContract, DtoProperty, ValidationContractUuid } from '../../../../infraestrutura';
import { DisciplinaFindOneByIdInputValidationContract, DisciplinaFindOneResultDto } from './disciplina-find-one.operation';
import { DisciplinaInputDtoValidationContract } from './disciplina-input.operation';
import { DisciplinaDto, DisciplinaDtoProperties } from './disciplina.dto';

// ======================================================

export const DisciplinaUpdateInputDtoValidationContract = createValidationContract(() => {
  return (
    yup
      //
      .object()
      .concat(DisciplinaFindOneByIdInputValidationContract())
      .concat(DisciplinaInputDtoValidationContract().partial())
      .shape({})
  );
});

// ======================================================

@InputType('DisciplinaUpdateInputDto')
export class DisciplinaUpdateInputDto implements IDisciplinaUpdateDto {
  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_ID)
  id!: string;

  //

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_NOME, { required: false })
  nome?: string;

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_CARGA_HORARIA, { required: false })
  cargaHoraria?: number;

  //
}

export class DisciplinaUpdateWithoutIdInputDto extends OmitType(DisciplinaUpdateInputDto, ['id'] as const) {}

export const DISCIPLINA_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de "disciplina".',

  gql: {
    name: 'disciplinaUpdate',

    inputDtoType: () => DisciplinaUpdateInputDto,
    inputDtoValidationContract: DisciplinaUpdateInputDtoValidationContract,

    returnType: () => DisciplinaDto,
  },

  swagger: {
    inputBodyType: DisciplinaUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => DisciplinaUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de "disciplina".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: DisciplinaFindOneResultDto,
  },
});
