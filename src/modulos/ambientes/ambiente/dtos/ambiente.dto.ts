import { Int } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  ObjectUuidDto,
  ValidationContractNumber,
  ValidationContractObjectUuidBase,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../infraestrutura/utils/createDtoClass';
import { ImagemDto, ImagemFindOneResultDto } from '../../../base/imagem/imagem.dtos';
import { BlocoDto, BlocoFindOneResultDto } from '../../bloco/dtos';

// ======================================================

export const AmbienteDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    nome: ValidationContractString().required().nonNullable().min(1),
    descricao: ValidationContractString().required().nonNullable().min(1),
    codigo: ValidationContractString().required().nonNullable().min(1),
    capacidade: ValidationContractNumber().integer().moreThan(0).nullable(),
    tipo: ValidationContractString().nullable(),
    //

    bloco: ValidationContractObjectUuidBase({ required: true, optional: false }),
  });
});

// ======================================================

export const AmbienteDtoProperties = createDtoPropertyMap({
  AMBIENTE_ID: CommonPropertyUuid('ID do ambiente/sala.'),

  AMBIENTE_NOME: {
    nullable: false,
    description: 'Nome do ambiente/sala.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  AMBIENTE_DESCRICAO: {
    nullable: false,
    description: 'Descrição do ambiente/sala.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  AMBIENTE_CODIGO: {
    nullable: false,
    description: 'Código do ambiente/sala.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  AMBIENTE_CAPACIDADE: {
    nullable: true,
    description: 'Capacidade do ambiente/sala.',
    //
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },

  AMBIENTE_TIPO: {
    nullable: true,
    description: 'Tipo do ambiente/sala. Ex.: sala aula, auditório, laboratório de química.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  AMBIENTE_BLOCO_INPUT: {
    nullable: false,
    description: 'Bloco que o ambiente/sala pertence.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: () => ObjectUuidDto,
    },
  },

  AMBIENTE_BLOCO_OUTPUT: {
    nullable: false,
    description: 'Bloco que o ambiente/sala pertence.',
    //
    gql: {
      type: () => BlocoDto,
    },
    swagger: {
      type: () => BlocoFindOneResultDto,
    },
  },

  AMBIENTE_IMAGEM_CAPA_OUTPUT: {
    nullable: true,
    description: 'Imagem de capa do ambiente.',
    //
    gql: {
      type: () => ImagemDto,
    },
    swagger: {
      type: ImagemFindOneResultDto,
    },
  },
});

// ======================================================
export const AmbienteDto = createEntityDtoClass(Spec.AmbienteDeclarationFactory);
// ======================================================
