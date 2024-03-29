import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { IEntityDate } from '../../../(spec)';
import { CommonPropertyUuid, DtoProperty, ValidationContractString, ValidationContractUuid, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';
import { ImagemArquivoDto, ImagemArquivoFindOneResultDto } from '../../imagem-arquivo/dtos';

// ======================================================

export const ImagemDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),
    //
    descricao: ValidationContractString().nullable(),
  });
});

// ======================================================

export const ImagemDtoProperties = createDtoPropertyMap({
  IMAGEM_ID: CommonPropertyUuid('ID da imagem'),

  IMAGEM_DESCRICAO: {
    nullable: true,
    description: 'Descrição da imagem.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  IMAGEM_IMAGEM_ARQUIVO_OUTPUT: {
    nullable: false,
    description: 'Versões da imagem.',
    //
    gql: {
      type: () => [ImagemArquivoDto],
    },
    swagger: {
      type: [ImagemArquivoFindOneResultDto],
    },
  },
});

// ======================================================

@ObjectType('Imagem')
export class ImagemDto implements Dto.IImagemModel {
  @DtoProperty(ImagemDtoProperties.IMAGEM_ID)
  id!: string;

  //

  @DtoProperty(ImagemDtoProperties.IMAGEM_DESCRICAO)
  descricao!: string | null;

  @DtoProperty(ImagemDtoProperties.IMAGEM_IMAGEM_ARQUIVO_OUTPUT)
  imagemArquivo!: Dto.IImagemArquivoModel[];

  //

  dateCreated!: IEntityDate;
  dateUpdated!: IEntityDate;
  dateDeleted!: IEntityDate | null;
}

// ======================================================
