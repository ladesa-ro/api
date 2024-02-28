import { ObjectType } from '@nestjs/graphql';
import { CampusDto, CampusFindOneResultDto } from 'application/core-business/ambientes/campus/dtos';
import * as yup from 'yup';
import { CommonPropertyUuid, ICampusModel, IEntityDate, IUsuarioModel, IUsuarioVinculoCampusModel, ObjectUuidDto } from '../../../(dtos)';
import { DtoProperty, ValidationContractObjectUuid, ValidationContractUuid, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';
import { UsuarioDto, UsuarioFindOneResultDto } from '../../usuario/dtos';

// ======================================================

export const UsuarioVinculoCampusDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //

    ativo: yup.bool(),
    cargo: yup.string().oneOf(['dape', 'professor']).required().nonNullable(),

    //

    usuario: ValidationContractObjectUuid({ required: true }).defined().required(),
    campus: ValidationContractObjectUuid({ required: true }).defined().required(),
  });
});

// ======================================================

export const UsuarioVinculoCampusDtoProperties = createDtoPropertyMap({
  VINCULO_ID: CommonPropertyUuid('ID do vínculo.'),

  VINCULO_ATIVO: {
    nullable: false,
    description: 'Situação do vínculo.',
    //
    gql: {
      type: () => Boolean,
    },
    swagger: {
      type: 'boolean',
    },
  },

  VINCULO_CARGO: {
    nullable: false,
    description: 'Cargo do vínculo.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
      enum: ['dape', 'professor'],
    },
  },

  VINCULO_CAMPUS_INPUT: {
    nullable: false,
    description: 'Campus do vínculo.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },

  VINCULO_CAMPUS_OUTPUT: {
    nullable: false,
    description: 'Campus do vínculo.',
    //
    gql: {
      type: () => CampusDto,
    },
    swagger: {
      type: CampusFindOneResultDto,
    },
  },

  //

  VINCULO_USUARIO_INPUT: {
    nullable: false,
    description: 'Usuário do vínculo.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },

  VINCULO_USUARIO_OUTPUT: {
    nullable: false,
    description: 'Usuário do vínculo.',
    //
    gql: {
      type: () => UsuarioDto,
    },
    swagger: {
      type: UsuarioFindOneResultDto,
    },
  },
});

// ======================================================

@ObjectType('UsuarioVinculoCampus')
export class UsuarioVinculoCampusDto implements IUsuarioVinculoCampusModel {
  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_ID)
  id!: string;

  //

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_ATIVO)
  ativo!: boolean;

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_CARGO)
  cargo!: string;

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_CAMPUS_OUTPUT)
  campus!: ICampusModel;

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_USUARIO_OUTPUT)
  usuario!: IUsuarioModel;

  //

  dateCreated!: IEntityDate;
  dateUpdated!: IEntityDate;
  dateDeleted!: IEntityDate | null;
}

// ======================================================
