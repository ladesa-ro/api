import { InputType, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(dtos)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { BlocoDto, BlocoDtoProperties, BlocoDtoValidationContract } from './bloco.dto';

// ======================================================

@ObjectType('BlocoFindOneResultDto')
export class BlocoFindOneResultDto implements Dto.IBlocoFindOneResultDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;

  //
  @DtoProperty(BlocoDtoProperties.BLOCO_NOME)
  nome!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CODIGO)
  codigo!: string;

  //
  @DtoProperty(BlocoDtoProperties.BLOCO_CAMPUS_OUTPUT)
  campus!: Dto.ICampusFindOneResultDto;
}

// ======================================================

export const BlocoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(BlocoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('BlocoFindOneByIdInputDto')
export class BlocoFindOneByIdInputDto implements Dto.IBlocoFindOneByIdInputDto {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;
}

export const BLOCO_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um bloco por ID.',

  gql: {
    name: 'blocoFindOneById',

    inputDtoType: () => BlocoFindOneByIdInputDto,
    inputDtoValidationContract: BlocoFindOneByIdInputValidationContract,

    returnType: () => BlocoDto,
  },

  swagger: {
    returnType: BlocoFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID do bloco.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
