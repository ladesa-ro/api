import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import { IBlocoUpdateDto } from '../../../(dtos)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { BlocoFindOneByIdInputValidationContract, BlocoFindOneResultDto } from './bloco-find-one.operation';
import { BlocoInputDtoValidationContract } from './bloco-input.dto';
import { BlocoDto, BlocoDtoProperties } from './bloco.dto';

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
export const BLOCO_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de um bloco.',

  gql: {
    name: 'blocoUpdate',

    inputDtoType: () => BlocoUpdateInputDto,
    inputDtoValidationContract: BlocoUpdateInputDtoValidationContract,

    returnType: () => BlocoDto,
  },

  swagger: {
    inputBodyType: BlocoUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => BlocoUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID do bloco.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: BlocoFindOneResultDto,
  },
});
