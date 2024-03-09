import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { AmbienteDtoProperties, AmbienteDtoValidationContract } from './ambiente.dto';

// ======================================================

export const AmbienteDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(AmbienteDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('AmbienteDeleteOneByIdInputDto')
export class AmbienteDeleteOneByIdInputDto implements Dto.IAmbienteDeleteOneByIdInputDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;
}

// ======================================================
