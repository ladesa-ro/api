import { ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import {
  CommonPropertyUuid,
  DtoProperty,
  ObjectUuidDto,
  ValidationContractObjectUuid,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';
import { CampusDto, CampusFindOneResultDto } from 'application/business/ambientes/campus/dtos';
import { ModalidadeDto, ModalidadeFindOneResultDto } from '../../modalidade/dtos';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';

// ======================================================

export const CursoDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //

    nome: yup.mixed(), // curso

    nomeAbreviado: yup.mixed(), // curso

    campus: yup.mixed(), // curso

    modalidade: yup.mixed(), // curso

    //
  });
});


// ======================================================

export const CursoDtoProperties = createDtoPropertyMap({
  CURSO_ID: CommonPropertyUuid('ID da Curso'),

  //

  CURSO_NOME: {
    nullable: false,
    description: 'NomeDoCurso',
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
    description: 'NomeAbreviadoDoCurso',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  CURSO_CAMPUS: {
    nullable: false,
    description: 'CampusQueOCursoPertence',
    //
    gql: {
      type: () => CampusDto,
    },
    swagger: {
      type: CampusFindOneResultDto,
    },
  },
  CURSO_MODALIDADE: {
    nullable: false,
    description: 'ModalidadeAQueOCursoPertence',
    //
    gql: {
      type: () => ModalidadeDto,
    },
    swagger: {
      type: ModalidadeFindOneResultDto,
    },
  }
  //

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

  @DtoProperty(CursoDtoProperties.CURSO_CAMPUS)
  campus!: CampusEntity;

  @DtoProperty(CursoDtoProperties.CURSO_MODALIDADE)
  modalidade!: ModalidadeEntity;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;

}
