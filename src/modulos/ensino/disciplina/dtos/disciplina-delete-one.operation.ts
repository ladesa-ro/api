import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { createDtoOperationOptions, createValidationContract, DtoProperty, getSchemaField, ValidationContractUuid } from '../../../../infraestrutura';
import { DisciplinaDtoProperties, DisciplinaDtoValidationContract } from './disciplina.dto';

// ======================================================

export const DisciplinaDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(DisciplinaDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('DisciplinaDeleteOneByIdInputDto')
export class DisciplinaDeleteOneByIdInputDto implements Dto.IDisciplinaDeleteOneByIdInputDto {
  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_ID)
  id!: string;
}

// ======================================================

export const DISCIPLINA_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de "disciplina" por ID.',

  gql: {
    name: 'disciplinaDeleteOneById',

    inputDtoType: () => DisciplinaDeleteOneByIdInputDto,
    inputDtoValidationContract: DisciplinaDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID de "disciplina".',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
