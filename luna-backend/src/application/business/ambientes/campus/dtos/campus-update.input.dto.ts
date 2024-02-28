import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import { ICampusUpdateDto, IEnderecoInputDto } from '../../../(dtos)';
import { DtoProperty, createValidationContract } from '../../../../../infrastructure';
import { CampusFindOneByIdInputValidationContract } from './campus-find-one-by-id.input.dto';
import { CampusInputDtoValidationContract } from './campus-input.dto';
import { CampusDtoProperties } from './campus.dto';

// ======================================================

export const CampusUpdateInputDtoValidationContract = createValidationContract(() => {
  return yup.object().concat(CampusFindOneByIdInputValidationContract()).concat(CampusInputDtoValidationContract());
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
