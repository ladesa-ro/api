import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import { ICampusUpdateDto, IEnderecoInputDto } from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { CampusFindOneByIdInputValidationContract, CampusFindOneResultDto } from './campus-find-one.operation';
import { CampusInputDtoValidationContract } from './campus-input.dto';
import { CampusDto, CampusDtoProperties } from './campus.dto';

// ======================================================

export const CampusUpdateInputDtoValidationContract = createValidationContract(() => {
  return (
    yup
      //
      .object()
      .concat(CampusFindOneByIdInputValidationContract())
      .concat(CampusInputDtoValidationContract().partial())
  );
});

// ======================================================

@InputType('CampusUpdateInputDto')
export class CampusUpdateInputDto implements ICampusUpdateDto {
  @DtoProperty(CampusDtoProperties.CAMPUS_ID)
  id!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_NOME_FANTASIA, { required: false })
  nomeFantasia?: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_RAZAO_SOCIAL, { required: false })
  razaoSocial?: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_APELIDO, { required: false })
  apelido?: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_CNPJ, { required: false })
  cnpj?: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_ENDERECO_INPUT, { required: false })
  endereco?: IEnderecoInputDto;
}

export class CampusUpdateWithoutIdInputDto extends OmitType(CampusUpdateInputDto, ['id'] as const) {}
export const CAMPUS_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de um campus.',

  gql: {
    name: 'campusUpdate',

    inputDtoType: () => CampusUpdateInputDto,
    inputDtoValidationContract: CampusUpdateInputDtoValidationContract,

    returnType: () => CampusDto,
  },

  swagger: {
    inputBodyType: CampusUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => CampusUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID do campus.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: CampusFindOneResultDto,
  },
});
