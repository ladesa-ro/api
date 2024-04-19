import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { CampusDto, CampusFindOneResultDto } from 'application/business/ambientes/campus/dtos';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/modalidade.entity';
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
import { ModalidadeDto, ModalidadeFindOneResultDto } from '../../modalidade/dtos';

// ======================================================

export const CursoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    nome: ValidationContractString().required().nonNullable(),
    nomeAbreviado: ValidationContractString().required().nonNullable(),
    //

    campus: ValidationContractObjectUuidBase({ required: true, optional: false }),
    modalidade: ValidationContractObjectUuidBase({ required: true, optional: false }),
  });
});

// ======================================================

export const CursoDtoProperties = createDtoPropertyMap({
  CURSO_ID: CommonPropertyUuid('ID do Curso'),

  //

  CURSO_NOME: {
    nullable: false,
    description: 'Nome do curso.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  CURSO_NOME_ABREVIADO: {
    nullable: false,
    description: 'Nome abreviado do curso.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  // ==============================================
  CURSO_CAMPUS_INPUT: {
    nullable: false,
    description: 'Campus que o curso pertence.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },
  // ===================
  CURSO_CAMPUS_OUTPUT: {
    nullable: false,
    description: 'Campus que o curso pertence.',
    //
    gql: {
      type: () => CampusDto,
    },
    swagger: {
      type: CampusFindOneResultDto,
    },
  },
  // ==============================================
  CURSO_MODALIDADE_INPUT: {
    nullable: false,
    description: 'Modalidade a que o curso pertence.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },
  // ===================
  CURSO_MODALIDADE_OUTPUT: {
    nullable: false,
    description: 'Modalidade a que o curso pertence.',
    //
    gql: {
      type: () => ModalidadeDto,
    },
    swagger: {
      type: ModalidadeFindOneResultDto,
    },
  },

  CURSO_IMAGEM_CAPA_OUTPUT: {
    nullable: true,
    description: 'Imagem de capa do curso.',
    //
    gql: {
      type: () => ImagemDto,
    },
    swagger: {
      type: ImagemFindOneResultDto,
    },
  },
  // ==============================================
});

// ======================================================

@ObjectType('Curso')
export class CursoDto implements Dto.ICursoModel {
  @DtoProperty(CursoDtoProperties.CURSO_ID)
  id!: string;

  //

  @DtoProperty(CursoDtoProperties.CURSO_NOME)
  nome!: string;

  @DtoProperty(CursoDtoProperties.CURSO_NOME_ABREVIADO)
  nomeAbreviado!: string;

  @DtoProperty(CursoDtoProperties.CURSO_CAMPUS_OUTPUT)
  campus!: CampusEntity;

  @DtoProperty(CursoDtoProperties.CURSO_MODALIDADE_OUTPUT)
  modalidade!: ModalidadeEntity;

  @DtoProperty(CursoDtoProperties.CURSO_IMAGEM_CAPA_OUTPUT)
  imagemCapa!: Dto.IImagemModel | null;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
