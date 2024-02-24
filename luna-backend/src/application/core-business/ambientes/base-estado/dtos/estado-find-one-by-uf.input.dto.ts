import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IEstadoFindOneByUfInputDto } from '../../../(dtos)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { EstadoDtoProperties, EstadoDtoValidationContract } from './estado.dto';

// ======================================================

export const EstadoFindOneByUfInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    uf: getSchemaField(EstadoDtoValidationContract(), 'sigla'),
  }),
);

// ======================================================

@InputType('EstadoFindOneByUfInputDto')
export class EstadoFindOneByUfInputDto implements IEstadoFindOneByUfInputDto {
  @DtoProperty(EstadoDtoProperties.ESTADO_SIGLA)
  uf!: string;
}

// ======================================================
