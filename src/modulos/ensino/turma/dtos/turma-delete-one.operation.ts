import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { createDtoOperationOptions, createValidationContract, DtoProperty, getSchemaField, ValidationContractUuid } from '../../../../infraestrutura';
import { TurmaDtoProperties, TurmaDtoValidationContract } from './turma.dto';

// ======================================================

export const TurmaDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(TurmaDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('TurmaDeleteOneByIdInputDto')
export class TurmaDeleteOneByIdInputDto implements Dto.ITurmaDeleteOneByIdInputDto {
  @DtoProperty(TurmaDtoProperties.TURMA_ID)
  id!: string;
}

// ======================================================

export const TURMA_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de "turma" por ID.',

  gql: {
    name: 'turmaDeleteOneById',

    inputDtoType: () => TurmaDeleteOneByIdInputDto,
    inputDtoValidationContract: TurmaDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID de "turma".',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
