import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  ICampusModel,
  IEnderecoModel,
  IEntityDate,
} from '../../../(dtos)';
import {
  DtoProperty,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
import {
  EnderecoDto,
  EnderecoFindOneResultDto,
  EnderecoInputDto,
  EnderecoInputDtoValidationContract,
} from '../../endereco/dtos';

// ======================================================

export const CampusDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid({ required: true }),

    //

    nomeFantasia: ValidationContractString(),
    razaoSocial: ValidationContractString(),
    apelido: ValidationContractString(),
    cnpj: ValidationContractString(),

    //

    endereco: EnderecoInputDtoValidationContract(),
  });
});

// ======================================================

export const CampusDtoProperties = createDtoPropertyMap({
  CAMPUS_ID: CommonPropertyUuid('ID do campus'),

  CAMPUS_NOME_FANTASIA: {
    nullable: false,
    description: 'Nome fantasia do campus.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  CAMPUS_RAZAO_SOCIAL: {
    nullable: false,
    description: 'Razão social do campus.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  CAMPUS_APELIDO: {
    nullable: false,
    description: 'Apelido do campus.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  CAMPUS_CNPJ: {
    nullable: false,
    description: 'CNPJ do campus.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  CAMPUS_ENDERECO_INPUT: {
    nullable: false,
    description: 'Endereço do campus.',
    //
    gql: {
      type: () => EnderecoInputDto,
    },
    swagger: {
      type: () => EnderecoInputDto,
    },
  },

  CAMPUS_ENDERECO_OUTPUT: {
    nullable: false,
    description: 'Endereço do campus.',
    //
    gql: {
      type: () => EnderecoDto,
    },
    swagger: {
      type: () => EnderecoFindOneResultDto,
    },
  },
});

// ======================================================

@ObjectType('Campus')
export class CampusDto implements ICampusModel {
  @DtoProperty(CampusDtoProperties.CAMPUS_ID)
  id!: string;

  //

  @DtoProperty(CampusDtoProperties.CAMPUS_NOME_FANTASIA)
  nomeFantasia!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_RAZAO_SOCIAL)
  razaoSocial!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_APELIDO)
  apelido!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_CNPJ)
  cnpj!: string;

  @DtoProperty(CampusDtoProperties.CAMPUS_ENDERECO_OUTPUT)
  endereco!: IEnderecoModel;

  //

  dateCreated!: IEntityDate;
  dateUpdated!: IEntityDate;
  dateDeleted!: IEntityDate | null;
}

// ======================================================
