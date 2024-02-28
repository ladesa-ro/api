import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(dtos)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { AmbienteDtoProperties, AmbienteDtoValidationContract } from './ambiente.dto';

// ======================================================

export const AmbienteFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(AmbienteDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('AmbienteFindOneByIdInputDto')
export class AmbienteFindOneByIdInputDto implements Dto.IAmbienteFindOneByIdInputDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;
}

// ======================================================
