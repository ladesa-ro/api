import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { ICampusFindOneByIdInputDto } from '../../../(dtos)';
import {
  DtoProperty,
  createValidationContract,
  getSchemaField,
} from '../../../../../infrastructure';
import { CampusDtoProperties, CampusDtoValidationContract } from './campus.dto';

// ======================================================

export const CampusFindOneByIdInputValidationContract =
  createValidationContract(() =>
    yup.object().shape({
      id: getSchemaField(CampusDtoValidationContract(), 'id'),
    }),
  );

// ======================================================

@InputType('CampusFindOneByIdInputDto')
export class CampusFindOneByIdInputDto implements ICampusFindOneByIdInputDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_ID)
  id!: string;
}

// ======================================================
