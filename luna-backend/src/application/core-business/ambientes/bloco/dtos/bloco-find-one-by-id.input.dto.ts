import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IBlocoFindOneByIdInputDto } from '../../../(dtos)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { BlocoDtoProperties, BlocoDtoValidationContract } from './bloco.dto';

// ======================================================

export const BlocoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(BlocoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('BlocoFindOneByIdInputDto')
export class BlocoFindOneByIdInputDto implements IBlocoFindOneByIdInputDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;
}

// ======================================================
