import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IEntityDate, IImagemModel, IUsuarioModel, IUsuarioVinculoCampusModel } from '../../../(spec)';
import { CommonPropertyUuid, DtoProperty, ValidationContractString, ValidationContractUuid, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';
import { ImagemDto, ImagemFindOneResultDto } from '../../../base/imagem/dtos';

// ======================================================

export const UsuarioDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //

    nome: ValidationContractString().required().nonNullable().min(1),
    matriculaSiape: ValidationContractString().required().nonNullable().min(1),
    email: ValidationContractString().email().required().nonNullable().min(1),

    //
  });
});

// ======================================================

export const UsuarioDtoProperties = createDtoPropertyMap({
  USUARIO_ID: CommonPropertyUuid('ID do usuário.'),

  USUARIO_NOME: {
    nullable: false,
    description: 'Nome do usuário.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  USUARIO_MATRICULA_SIAPE: {
    nullable: false,
    description: 'Matrícula Siape do usuário.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  USUARIO_EMAIL: {
    nullable: false,
    description: 'E-mail do usuário.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },

  //
  USUARIO_IMAGEM_CAPA_OUTPUT: {
    nullable: true,
    description: 'Imagem de capa do usuário.',
    //
    gql: {
      type: () => ImagemDto,
    },
    swagger: {
      type: ImagemFindOneResultDto,
    },
  },
  USUARIO_IMAGEM_PERFIL_OUTPUT: {
    nullable: true,
    description: 'Imagem de perfil do usuário.',
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

@ObjectType('Usuario')
export class UsuarioDto implements IUsuarioModel {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;

  //

  @DtoProperty(UsuarioDtoProperties.USUARIO_NOME)
  nome!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE)
  matriculaSiape!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_EMAIL)
  email!: string;

  //

  @DtoProperty(UsuarioDtoProperties.USUARIO_IMAGEM_CAPA_OUTPUT)
  imagemCapa!: IImagemModel | null;

  @DtoProperty(UsuarioDtoProperties.USUARIO_IMAGEM_PERFIL_OUTPUT)
  imagemPerfil!: IImagemModel | null;

  //

  isSuperUser!: boolean;

  //

  vinculosAtivos!: IUsuarioVinculoCampusModel[];

  //

  dateCreated!: IEntityDate;
  dateUpdated!: IEntityDate;
  dateDeleted!: IEntityDate | null;
}

// ======================================================
