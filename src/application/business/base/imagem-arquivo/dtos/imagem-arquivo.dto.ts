import { Int, ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  DtoProperty,
  ValidationContractNumber,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
import { ArquivoDto } from '../../arquivo/dtos';
import { ArquivoFindOneResultDto } from '../../arquivo/dtos/arquivo-find-one.operation';
import { ImagemDto, ImagemFindOneResultDto } from '../../imagem/dtos';

// ======================================================

export const ImagemDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    largura: ValidationContractNumber().integer().positive().required().nonNullable(),
    altura: ValidationContractNumber().integer().positive().required().nonNullable(),
    //
    formato: ValidationContractString().required().nonNullable(),
    mimeType: ValidationContractString().required().nonNullable(),
  });
});

// ======================================================

export const ImagemArquivoDtoProperties = createDtoPropertyMap({
  IMAGEM_ARQUIVO_ID: CommonPropertyUuid('ID do arquivo'),

  IMAGEM_ARQUIVO_LARGURA: {
    nullable: false,
    description: 'Largura da imagem.',
    //
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },

  IMAGEM_ARQUIVO_ALTURA: {
    nullable: false,
    description: 'Largura da imagem.',
    //
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },

  IMAGEM_ARQUIVO_FORMATO: {
    nullable: false,
    description: 'Formato da imagem.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  IMAGEM_ARQUIVO_MIME_TYPE: {
    nullable: false,
    description: 'Formato da imagem.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  IMAGEM_ARQUIVO_IMAGEM_OUTPUT: {
    nullable: false,
    description: 'Imagem.',
    //
    gql: {
      type: () => ImagemDto,
    },
    swagger: {
      type: ImagemFindOneResultDto,
    },
  },

  IMAGEM_ARQUIVO_ARQUIVO_OUTPUT: {
    nullable: false,
    description: 'Arquivo.',
    //
    gql: {
      type: () => ArquivoDto,
    },
    swagger: {
      type: ArquivoFindOneResultDto,
    },
  },
});

// ======================================================

@ObjectType('ImagemArquivo')
export class ImagemArquivoDto implements Dto.IImagemArquivoModel {
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_ID)
  id!: string;

  //

  //
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_LARGURA)
  largura!: number;
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_ALTURA)
  altura!: number;
  //
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_FORMATO)
  formato!: string;
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_MIME_TYPE)
  mimeType!: string;
  //

  //
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_IMAGEM_OUTPUT)
  imagem!: Dto.IImagemModel;
  @DtoProperty(ImagemArquivoDtoProperties.IMAGEM_ARQUIVO_ARQUIVO_OUTPUT)
  arquivo!: Dto.IArquivoModel;
  //

  dateCreated!: Dto.IEntityDate;
}

// ======================================================
