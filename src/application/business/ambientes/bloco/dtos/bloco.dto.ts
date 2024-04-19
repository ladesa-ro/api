import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { IImagemModel } from '@sisgea/spec';
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
import { ImagemDto, ImagemFindOneResultDto } from '../../../base/imagem/dtos';
import { CampusDto, CampusFindOneResultDto } from '../../campus/dtos';

// ======================================================

export const BlocoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    nome: ValidationContractString().required().nonNullable(),
    codigo: ValidationContractString().required().nonNullable(),
    //

    campus: ValidationContractObjectUuidBase({ required: true, optional: false }),
  });
});

// ======================================================

export const BlocoDtoProperties = createDtoPropertyMap({
  BLOCO_ID: CommonPropertyUuid('ID do bloco'),

  BLOCO_NOME: {
    nullable: false,
    description: 'Nome do bloco.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  BLOCO_CODIGO: {
    nullable: false,
    description: 'Código / Letra / Número do bloco.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  BLOCO_CAMPUS_INPUT: {
    nullable: false,
    description: 'Campus que o bloco pertence.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: () => ObjectUuidDto,
    },
  },

  BLOCO_CAMPUS_OUTPUT: {
    nullable: false,
    description: 'Campus que o bloco pertence.',
    //
    gql: {
      type: () => CampusDto,
    },
    swagger: {
      type: () => CampusFindOneResultDto,
    },
  },

  BLOCO_IMAGEM_CAPA_OUTPUT: {
    nullable: true,
    description: 'Imagem de capa do bloco.',
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

@ObjectType('Bloco')
export class BlocoDto implements Dto.IBlocoModel {
  @DtoProperty(BlocoDtoProperties.BLOCO_ID)
  id!: string;

  //

  @DtoProperty(BlocoDtoProperties.BLOCO_NOME)
  nome!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CODIGO)
  codigo!: string;

  @DtoProperty(BlocoDtoProperties.BLOCO_CAMPUS_OUTPUT)
  campus!: Dto.ICampusModel;

  //

  @DtoProperty(BlocoDtoProperties.BLOCO_IMAGEM_CAPA_OUTPUT)
  imagemCapa!: IImagemModel | null;

  //
  ambientes!: Dto.IAmbienteModel[];
  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}

// ======================================================
