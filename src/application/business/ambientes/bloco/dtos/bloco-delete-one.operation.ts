import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { BlocoDtoProperties, BlocoDtoValidationContract } from './bloco.dto';

// ======================================================

export const BlocoDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(BlocoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('BlocoDeleteOneByIdInputDto')
export class BlocoDeleteOneByIdInputDto implements Dto.IBlocoDeleteOneByIdInputDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;
}

// ======================================================

export const BLOCO_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de um bloco por ID.',

  gql: {
    name: 'blocoDeleteOneById',

    inputDtoType: () => BlocoDeleteOneByIdInputDto,
    inputDtoValidationContract: BlocoDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID do bloco.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
