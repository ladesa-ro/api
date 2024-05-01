import { InputType, ObjectType } from '@nestjs/graphql';
import { OmitType, PickType } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import {
  ICampusFindOneResultDto,
  IEntityDate,
  IImagemModel,
  IUsuarioFindOneResultDto,
  IUsuarioFindOneResultDtoVinculoAtivo,
  IUsuarioInputDto,
  IUsuarioModel,
  IUsuarioVinculoCampusModel,
} from '@sisgea/spec';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  DtoProperty,
  PaginatedResultDto,
  SearchInputDto,
  SearchInputValidationContract,
  createDtoOperationGetFileOptions,
  createDtoOperationOptions,
  createDtoPropertyMap,
} from '../../../legacy';
import { ValidationContractString, ValidationContractUuid, createValidationContract, getSchemaField } from '../../../validacao';
import { CampusFindOneResultDto } from '../../ambientes/campus/dtos';
import { ImagemDto, ImagemFindOneResultDto } from '../../base/imagem/imagem.dtos';
import { UsuarioVinculoCampusDto, UsuarioVinculoCampusDtoProperties, UsuarioVinculoCampusFindOneResultDto } from '../usuario-vinculo-campus/dtos';

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

// ======================================================

export const UsuarioFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(UsuarioDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('UsuarioFindOneByIdInputDto')
export class UsuarioFindOneByIdInputDto implements Dto.IUsuarioFindOneByIdInputDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;
}

// ======================================================

// ======================================================

export class UsuarioFindOneResultDtoVinculoAtivoCampus extends (PickType as any)(CampusFindOneResultDto, ['id', 'nomeFantasia', 'razaoSocial', 'apelido'] as const) {}

export class UsuarioFindOneResultDtoVinculoAtivo extends PickType(UsuarioVinculoCampusFindOneResultDto, ['id', 'ativo', 'cargo'] as const) {
  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_CAMPUS_OUTPUT, {
    swagger: {
      type: UsuarioFindOneResultDtoVinculoAtivoCampus,
    },
  })
  campus!: ICampusFindOneResultDto;
}

export const UsuarioFindOneDtoProperties = createDtoPropertyMap({
  USUARIO_VINCULOS_ATIVOS_OUTPUT: {
    nullable: false,
    description: 'Vínculos ativos do usuário.',
    //
    gql: {
      type: () => UsuarioVinculoCampusDto,
    },
    swagger: {
      type: UsuarioFindOneResultDtoVinculoAtivo,
    },
  },
});

// ======================================================

@ObjectType('UsuarioFindOneResultDto')
export class UsuarioFindOneResultDto implements IUsuarioFindOneResultDto {
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

  @DtoProperty(UsuarioFindOneDtoProperties.USUARIO_VINCULOS_ATIVOS_OUTPUT)
  vinculosAtivos!: IUsuarioFindOneResultDtoVinculoAtivo[];

  //
}

// ======================================================

// ======================================================

@ObjectType('UsuarioFindAllResult')
export class UsuarioFindAllResultDto extends PaginatedResultDto<Dto.IUsuarioFindOneResultDto> implements Dto.IUsuarioFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [UsuarioDto],
    },
    swagger: {
      type: [UsuarioFindOneResultDto],
    },
  })
  data!: Dto.IUsuarioFindOneResultDto[];
}

// =============================================================

export const USUARIO_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de todos os usuários cadastrados no sistema.',

  gql: {
    name: 'usuarioFindAll',
    returnType: () => UsuarioFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: UsuarioFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
    ],
  },
});

// ======================================================

// ======================================================

export const UsuarioDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(UsuarioDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('UsuarioDeleteOneByIdInputDto')
export class UsuarioDeleteOneByIdInputDto implements Dto.IUsuarioDeleteOneByIdInputDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;
}

// ======================================================

// ======================================================

export const USUARIO_GET_IMAGEM_CAPA = createDtoOperationGetFileOptions({
  description: 'Obtêm a imagem de capa do usuário.',

  meta: {
    getFile: {
      mimeType: 'image/jpeg',
    },
  },

  swagger: {
    params: [
      {
        name: 'id',
        description: 'ID do usuário.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================

// ======================================================

export const USUARIO_GET_IMAGEM_PERFIL = createDtoOperationGetFileOptions({
  description: 'Obtêm a imagem de perfil do usuário.',

  meta: {
    getFile: {
      mimeType: 'image/jpeg',
    },
  },

  swagger: {
    params: [
      {
        name: 'id',
        description: 'ID do usuário.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================

// ======================================================

export const UsuarioInputDtoValidationContract = createValidationContract(() => {
  const schema = UsuarioDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    matriculaSiape: getSchemaField(schema, 'matriculaSiape'),
    email: getSchemaField(schema, 'email'),
  });
});

// ======================================================

@InputType('UsuarioInputDto')
export class UsuarioInputDto implements IUsuarioInputDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_NOME)
  nome!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE)
  matriculaSiape!: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_EMAIL)
  email!: string;
}

// ======================================================

export const UsuarioUpdateInputDtoValidationContract = createValidationContract(() => {
  return (
    yup
      //
      .object()
      .concat(UsuarioFindOneByIdInputValidationContract())
      .concat(UsuarioInputDtoValidationContract().partial())
      .shape({})
  );
});

// ======================================================

@InputType('UsuarioUpdateInputDto')
export class UsuarioUpdateInputDto implements Dto.IUsuarioUpdateDto {
  @DtoProperty(UsuarioDtoProperties.USUARIO_ID)
  id!: string;

  //

  @DtoProperty(UsuarioDtoProperties.USUARIO_NOME, { required: false })
  nome?: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_MATRICULA_SIAPE, { required: false })
  matriculaSiape?: string;

  @DtoProperty(UsuarioDtoProperties.USUARIO_EMAIL, { required: false })
  email?: string;

  //
}

export class UsuarioUpdateWithoutIdInputDto extends OmitType(UsuarioUpdateInputDto, ['id'] as const) {}

export const UsuarioOperations = {
  // ===============================
  USUARIO_GET_IMAGEM_CAPA: USUARIO_GET_IMAGEM_CAPA,
  // ===============================
  USUARIO_GET_IMAGEM_PERFIL: USUARIO_GET_IMAGEM_PERFIL,
  // ===============================
  USUARIO_FIND_ALL: USUARIO_FIND_ALL,
  // ===============================

  USUARIO_FIND_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a consulta a um usuário por ID.',

    gql: {
      name: 'usuarioFindOneById',

      inputDtoType: () => UsuarioFindOneByIdInputDto,
      inputDtoValidationContract: UsuarioFindOneByIdInputValidationContract,

      returnType: () => UsuarioDto,
    },

    swagger: {
      returnType: UsuarioFindOneResultDto,

      params: [
        {
          name: 'id',
          description: 'ID do usuário.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================

  USUARIO_CREATE: createDtoOperationOptions({
    description: 'Realiza o cadastro de um usuário.',

    gql: {
      name: 'usuarioCreate',

      inputDtoType: () => UsuarioInputDto,
      inputDtoValidationContract: UsuarioInputDtoValidationContract,

      returnType: () => UsuarioDto,
    },

    swagger: {
      inputBodyType: UsuarioInputDto,
      inputBodyValidationContract: UsuarioInputDtoValidationContract,

      returnType: UsuarioFindOneResultDto,
    },
  }),

  // ===============================

  USUARIO_UPDATE: createDtoOperationOptions({
    description: 'Realiza a alteração de um usuário.',

    gql: {
      name: 'usuarioUpdate',

      inputDtoType: () => UsuarioUpdateInputDto,
      inputDtoValidationContract: UsuarioUpdateInputDtoValidationContract,

      returnType: () => UsuarioDto,
    },

    swagger: {
      inputBodyType: UsuarioUpdateWithoutIdInputDto,

      inputBodyValidationContract: createValidationContract(() => UsuarioUpdateInputDtoValidationContract().omit(['id'])),

      params: [
        {
          name: 'id',
          description: 'ID do usuário.',
          validationContract: ValidationContractUuid,
        },
      ],

      returnType: UsuarioFindOneResultDto,
    },
  }),

  // ===============================

  USUARIO_DELETE_ONE_BY_ID: createDtoOperationOptions({
    description: 'Realiza a remoção de um usuário por ID.',

    gql: {
      name: 'usuarioDeleteOneById',

      inputDtoType: () => UsuarioDeleteOneByIdInputDto,
      inputDtoValidationContract: UsuarioDeleteOneByIdInputValidationContract,

      returnType: () => Boolean,
    },

    swagger: {
      returnType: Boolean,

      params: [
        {
          name: 'id',
          description: 'ID do usuario.',
          validationContract: ValidationContractUuid,
        },
      ],
    },
  }),

  // ===============================
};
