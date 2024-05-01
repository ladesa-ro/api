import * as Spec from '@sisgea/spec';
import { uniqBy } from 'lodash';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  ObjectUuidDto,
  ValidationContractObjectUuidBase,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';
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
    // TODO: strict validacao
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

export const CampusDto = createEntityDtoClass(Spec.CampusDeclarationFactory);

// ======================================================
