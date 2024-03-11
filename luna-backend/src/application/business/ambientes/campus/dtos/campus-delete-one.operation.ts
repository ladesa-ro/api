import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { ICampusDeleteOneByIdInputDto } from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CampusDtoProperties, CampusDtoValidationContract } from './campus.dto';

// ======================================================

export const CampusDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CampusDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('CampusDeleteOneByIdInputDto')
export class CampusDeleteOneByIdInputDto implements ICampusDeleteOneByIdInputDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_ID)
  id!: string;
}

export const CAMPUS_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de um campus por ID.',

  gql: {
    name: 'campusDeleteOneById',

    inputDtoType: () => CampusDeleteOneByIdInputDto,
    inputDtoValidationContract: CampusDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID do campus.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
