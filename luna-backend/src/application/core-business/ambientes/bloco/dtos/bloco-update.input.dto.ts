import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import { IBlocoUpdateDto } from '../../../(dtos)';
import { DtoProperty, createValidationContract } from '../../../../../infrastructure';
import { BlocoFindOneByIdInputValidationContract } from './bloco-find-one-by-id.input.dto';
import { BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoDtoProperties } from './bloco.dto';

// ======================================================

export const BlocoUpdateInputDtoValidationContract = createValidationContract(() => {
  return yup
    .object()
    .concat(BlocoFindOneByIdInputValidationContract())
    .concat(BlocoInputDtoValidationContract().partial().omit(['campus']))
    .shape({
      campus: yup.mixed().strip().optional().nullable(),
    });
});

// ======================================================

@InputType('BlocoUpdateInputDto')
export class BlocoUpdateInputDto implements IBlocoUpdateDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_NOME, { required: false })
  nome?: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CODIGO, { required: false })
  codigo?: string;
}

export class BlocoUpdateWithoutIdInputDto extends OmitType(BlocoUpdateInputDto, ['id'] as const) {}
