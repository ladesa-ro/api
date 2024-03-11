import { Int, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IAmbienteModel, IBlocoModel, IEntityDate } from '../../../(spec)';
import {
  CommonPropertyUuid,
  DtoProperty,
  ObjectUuidDto,
  ValidationContractNumber,
  ValidationContractObjectUuid,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
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

    bloco: ValidationContractObjectUuid({ required: true }).defined().required(),
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
});

// ======================================================

@ObjectType('Ambiente')
export class AmbienteDto implements IAmbienteModel {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;

  //

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_NOME)
  nome!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_DESCRICAO)
  descricao!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CODIGO)
  codigo!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CAPACIDADE)
  capacidade!: number | null;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_TIPO)
  tipo!: string | null;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_BLOCO_OUTPUT)
  bloco!: IBlocoModel;

  //

  dateCreated!: IEntityDate;
  dateUpdated!: IEntityDate;
  dateDeleted!: IEntityDate | null;
}

// ======================================================
