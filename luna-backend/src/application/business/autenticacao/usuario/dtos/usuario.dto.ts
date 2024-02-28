import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IEntityDate, IUsuarioModel } from '../../../(dtos)';
import { CommonPropertyUuid, DtoProperty, ValidationContractString, ValidationContractUuid, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';

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

  isSuperUser!: boolean;

  dateCreated!: IEntityDate;
  dateUpdated!: IEntityDate;
  dateDeleted!: IEntityDate | null;
}

// ======================================================
