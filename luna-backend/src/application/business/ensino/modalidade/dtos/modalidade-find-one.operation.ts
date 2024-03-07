import { InputType, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(dtos)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { ModalidadeDto, ModalidadeDtoProperties, ModalidadeDtoValidationContract } from './modalidade.dto';

// ======================================================

@ObjectType('ModalidadeFindOneResultDto')
export class ModalidadeFindOneResultDto implements Dto.IModalidadeFindOneResultDto {
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_ID)
  id!: string;

  //
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_NOME)
  nome!: string;

  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_SLUG)
  slug!: string;

  //
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_CAMPUS_OUTPUT)
  campus!: Dto.ICampusFindOneResultDto;
}

// ======================================================

export const ModalidadeFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(ModalidadeDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('ModalidadeFindOneByIdInputDto')
export class ModalidadeFindOneByIdInputDto implements Dto.IModalidadeFindOneByIdInputDto {
  @DtoProperty(ModalidadeDtoProperties.MODALIDADE_ID)
  id!: string;
}

export const MODALIDADE_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a uma modalidade por ID.',

  gql: {
    name: 'modalidadeFindOneById',

    inputDtoType: () => ModalidadeFindOneByIdInputDto,
    inputDtoValidationContract: ModalidadeFindOneByIdInputValidationContract,

    returnType: () => ModalidadeDto,
  },

  swagger: {
    returnType: ModalidadeFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da modalidade.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
