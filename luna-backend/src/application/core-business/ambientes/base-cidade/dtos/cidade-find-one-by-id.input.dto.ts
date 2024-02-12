import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { ICidadeFindOneByIdInputDto } from '../../../(dtos)';
import {
  DtoProperty,
  createValidationContract,
  getSchemaField,
} from '../../../../../infrastructure';
import { CidadeDtoProperties, CidadeDtoValidationContract } from './cidade.dto';

// ======================================================

export const CidadeFindOneByIdInputValidationContract =
  createValidationContract(() =>
    yup.object().shape({
      id: getSchemaField(CidadeDtoValidationContract(), 'id'),
    }),
  );

// ======================================================

@InputType('CidadeFindOneByIdInputDto')
export class CidadeFindOneByIdInputDto implements ICidadeFindOneByIdInputDto {
  @DtoProperty(CidadeDtoProperties.CIDADE_ID)
  id!: number;
}

// ======================================================
