import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { createDtoOperationOptions, createValidationContract, DtoProperty, getSchemaField, ValidationContractUuid } from '../../../../infraestrutura';
import { DiarioDtoProperties, DiarioDtoValidationContract } from './diario.dto';

// ======================================================

export const DiarioDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(DiarioDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('DiarioDeleteOneByIdInputDto')
export class DiarioDeleteOneByIdInputDto implements Dto.IDiarioDeleteOneByIdInputDto {
  @DtoProperty(DiarioDtoProperties.DIARIO_ID)
  id!: string;
}

// ======================================================

export const DIARIO_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de "diario" por ID.',

  gql: {
    name: 'diarioDeleteOneById',

    inputDtoType: () => DiarioDeleteOneByIdInputDto,
    inputDtoValidationContract: DiarioDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID de "diario".',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
