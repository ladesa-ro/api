import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { ITurmaUpdateDto } from '@sisgea/spec';
import * as yup from 'yup';
import { TurmaFindOneByIdInputValidationContract, TurmaFindOneResultDto } from './turma-find-one.operation';
import { TurmaInputDtoValidationContract } from './turma-input.operation';
import { TurmaDto, TurmaDtoProperties } from './turma.dto';
import { createDtoOperationOptions, DtoProperty } from '../../../../legacy';
import { createValidationContract, ValidationContractObjectUuidBase, ValidationContractUuid } from '../../../../validacao';

// ======================================================

export const TurmaUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = TurmaInputDtoValidationContract();

  return (
    yup
      //
      .object()
      .concat(TurmaFindOneByIdInputValidationContract())
      .concat(schema.pick(['nome', 'periodo', 'grupo']).partial())
      .shape({
        curso: ValidationContractObjectUuidBase({ required: true, optional: true }),
        ambientePadraoAula: ValidationContractObjectUuidBase({ required: false, optional: true }),
      })
  );
});

// ======================================================

@InputType('TurmaUpdateInputDto')
export class TurmaUpdateInputDto implements ITurmaUpdateDto {
  @DtoProperty(TurmaDtoProperties.TURMA_ID)
  id!: string;

  //

  @DtoProperty(TurmaDtoProperties.TURMA_PERIODO, { required: false })
  periodo?: string;

  @DtoProperty(TurmaDtoProperties.TURMA_GRUPO, { required: false })
  grupo?: string;

  @DtoProperty(TurmaDtoProperties.TURMA_NOME, { required: false })
  nome?: string;

  @DtoProperty(TurmaDtoProperties.TURMA_AMBIENTE_PADRAO_AULA_INPUT, { required: false })
  ambientePadraoAula?: Dto.IObjectUuid | null;

  @DtoProperty(TurmaDtoProperties.TURMA_CURSO_INPUT, { required: false })
  curso?: Dto.IObjectUuid;

  //
}

export class TurmaUpdateWithoutIdInputDto extends OmitType(TurmaUpdateInputDto, ['id'] as const) {}

export const TURMA_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de "turma".',

  gql: {
    name: 'turmaUpdate',

    inputDtoType: () => TurmaUpdateInputDto,
    inputDtoValidationContract: TurmaUpdateInputDtoValidationContract,

    returnType: () => TurmaDto,
  },

  swagger: {
    inputBodyType: TurmaUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => TurmaUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de "turma".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: TurmaFindOneResultDto,
  },
});
