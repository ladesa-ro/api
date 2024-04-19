import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { uniqBy } from 'lodash';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  DtoProperty,
  ObjectUuidDto,
  ValidationContractObjectUuidBase,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
import { ModalidadeDto, ModalidadeFindOneResultDto } from '../../../ensino/modalidade/dtos';
import { EnderecoDto, EnderecoFindOneResultDto, EnderecoInputDto, EnderecoInputDtoValidationContract } from '../../endereco/dtos';

// ======================================================

export const CampusDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    nomeFantasia: ValidationContractString().required().nonNullable().min(1),
    razaoSocial: ValidationContractString().required().nonNullable().min(1),
    apelido: ValidationContractString().required().nonNullable().min(1),
    // TODO: strict validation
    cnpj: ValidationContractString().required().nonNullable().min(1),
    //
    endereco: EnderecoInputDtoValidationContract(),
    //
    modalidades: yup.array(ValidationContractObjectUuidBase({ required: true, optional: false })).test('', (arr) => {
      if (Array.isArray(arr)) {
        const validRefs = arr.filter((i) => i?.id);
        const uniqueRefs = uniqBy(validRefs, 'id');
        return uniqueRefs.length === arr.length;
      }
      return false;
    }),
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

  CAMPUS_MODALIDADES_INPUT: {
    nullable: false,
    description: 'Modalidades do campus.',
    //
    gql: {
      type: () => [ObjectUuidDto],
    },
    swagger: {
      type: () => [ObjectUuidDto],
    },
  },

  CAMPUS_MODALIDADES_OUTPUT: {
    nullable: false,
    description: 'Modalidades do campus.',
    //
    gql: {
      type: () => [ModalidadeDto],
    },
    swagger: {
      type: () => [ModalidadeFindOneResultDto],
    },
  },
});

// ======================================================

@ObjectType('Campus')
export class CampusDto implements Dto.ICampusModel {
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
  endereco!: Dto.IEnderecoModel;

  @DtoProperty(CampusDtoProperties.CAMPUS_MODALIDADES_OUTPUT)
  modalidades!: Dto.IModalidadeModel[];

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}

// ======================================================
