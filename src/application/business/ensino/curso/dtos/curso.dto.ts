import * as Spec from '@sisgea/spec';
import { CampusDto, CampusFindOneResultDto } from 'application/business/ambientes/campus/dtos';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { CommonPropertyUuid, ObjectUuidDto, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';
import { ImagemDto, ImagemFindOneResultDto } from '../../../base/imagem/dtos';
import { ModalidadeDto, ModalidadeFindOneResultDto } from '../../modalidade/dtos';

// ======================================================

export const CursoDtoValidationContract = createValidationContract(() => {
  return new Spec.CursoValidationContract().constructYupSchema(yup);
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
export const CursoDto = createEntityDtoClass(Spec.CursoDeclarationFactory);
// ======================================================
