import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { ICampusDeleteOneByIdInputDto } from '../../../(dtos)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
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

// ======================================================
