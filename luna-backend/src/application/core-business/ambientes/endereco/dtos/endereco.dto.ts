import { InputType, Int } from '@nestjs/graphql';
import * as yup from 'yup';
import { CommonPropertyUuid, ObjectIdDto } from '../../../(dtos)';
import {
  ICidadeModel,
  IEnderecoModel,
  IEntityDate,
} from '../../../../../domain';
import {
  DtoProperty,
  ValidationContractLocalizacaoCep,
  ValidationContractNumber,
  ValidationContractObjectId,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
import { CidadeDto, CidadeFindOneResultDto } from '../../base-cidade/dtos';

// ======================================================

export const EnderecoDtoValidationContract = createValidationContract(() => {
  return yup.object().shape({
    id: ValidationContractUuid(),

    //

    cep: ValidationContractLocalizacaoCep(),

    logradouro: ValidationContractString(),

    numero: ValidationContractNumber().integer().positive(),

    bairro: ValidationContractString(),

    complemento: ValidationContractString()
      .nullable()
      .default(() => null),

    pontoReferencia: ValidationContractString()
      .nullable()
      .default(() => null),

    cidade: ValidationContractObjectId({ required: true }).defined().required(),
  });
});

// ======================================================

export const EnderecoDtoProperties = createDtoPropertyMap({
  ENDERECO_ID: CommonPropertyUuid('ID do endereço.'),

  ENDERECO_CEP: {
    nullable: false,
    description: 'CEP do Endereço',

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  },

  ENDERECO_LOGRADOURO: {
    nullable: false,
    description: 'Logradouro do Endereço',

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  },

  ENDERECO_NUMERO: {
    nullable: false,
    description: 'Número do Endereço',
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },

  ENDERECO_BAIRRO: {
    nullable: false,
    description: 'Bairro do Endereço',
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  ENDERECO_COMPLEMENTO: {
    nullable: true,
    description: 'Complemento do Endereço',
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  ENDERECO_PONTO_REFERENCIA: {
    nullable: true,
    description: 'Ponto de referência do Endereço',
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  ENDERECO_CIDADE_INPUT: {
    nullable: false,
    description: 'Cidade do Endereço',
    gql: {
      type: () => ObjectIdDto,
    },
    swagger: {
      type: () => ObjectIdDto,
    },
  },

  ENDERECO_CIDADE_OUTPUT: {
    nullable: false,
    description: 'Cidade do Endereço',
    gql: {
      type: () => CidadeDto,
    },
    swagger: {
      type: () => CidadeFindOneResultDto,
    },
  },
});

// ======================================================

@InputType('Endereco')
export class EnderecoDto implements IEnderecoModel {
  @DtoProperty(EnderecoDtoProperties.ENDERECO_ID)
  id!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_CEP)
  cep!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_LOGRADOURO)
  logradouro!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_NUMERO)
  numero!: number;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_BAIRRO)
  bairro!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_COMPLEMENTO)
  complemento!: string | null;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_PONTO_REFERENCIA)
  pontoReferencia!: string | null;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_CIDADE_OUTPUT)
  cidade!: ICidadeModel;

  dateCreated!: IEntityDate;
  dateUpdated!: IEntityDate;
  dateDeleted!: IEntityDate | null;
}

// ======================================================
