import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, createDtoOperationOptions } from '../../../../legacy';
import { ValidationContractUuid, createValidationContract, getSchemaField } from '../../../../validacao';

import { DiarioProfessorDtoProperties, DiarioProfessorDtoValidationContract } from './diario-professor.dto';

// ======================================================

export const DiarioProfessorDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(DiarioProfessorDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('DiarioProfessorDeleteOneByIdInputDto')
export class DiarioProfessorDeleteOneByIdInputDto implements Dto.IDiarioProfessorDeleteOneByIdInputDto {
  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_ID)
  id!: string;
}

// ======================================================

export const DIARIO_PROFESSOR_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção do vínculo de diário e professor por ID.',

  gql: {
    name: 'diarioProfessorDeleteOneById',

    inputDtoType: () => DiarioProfessorDeleteOneByIdInputDto,
    inputDtoValidationContract: DiarioProfessorDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID do vínculo de diário e professor.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
