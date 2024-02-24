import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IBlocoDeleteOneByIdInputDto } from '../../../(dtos)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { BlocoDtoProperties, BlocoDtoValidationContract } from './bloco.dto';

// ======================================================

export const BlocoDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(BlocoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('BlocoDeleteOneByIdInputDto')
export class BlocoDeleteOneByIdInputDto implements IBlocoDeleteOneByIdInputDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;
}

// ======================================================
