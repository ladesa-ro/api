import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IEstadoFindOneByIdInputDto } from '../../../(dtos)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { EstadoDtoProperties, EstadoDtoValidationContract } from './estado.dto';

// ======================================================

export const EstadoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(EstadoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('EstadoFindOneByIdInputDto')
export class EstadoFindOneByIdInputDto implements IEstadoFindOneByIdInputDto {
  @DtoProperty(EstadoDtoProperties.ESTADO_ID)
  id!: number;
}

// ======================================================
