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
} from '../../../../infraestrutura';
import { ImagemDto, ImagemFindOneResultDto } from '../../../base/imagem/imagem.dtos';

// ======================================================

export const DisciplinaDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //

    nome: ValidationContractString().required().nonNullable(), // disciplina
    cargaHoraria: ValidationContractNumber().required().nonNullable().integer().moreThan(0), // disciplina

    //
  });
});

// ======================================================

export const DisciplinaDtoProperties = createDtoPropertyMap({
  DISCIPLINA_ID: CommonPropertyUuid('ID de "disciplina"'),

  //

  DISCIPLINA_NOME: {
    nullable: false,
    description: 'Nome da disciplina.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  DISCIPLINA_CARGA_HORARIA: {
    nullable: false,
    description: 'Carga horária da disciplina.',
    //
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },

  DISCIPLINA_IMAGEM_CAPA_OUTPUT: {
    nullable: true,
    description: 'Imagem de capa da disciplina.',
    //
    gql: {
      type: () => ImagemDto,
    },
    swagger: {
      type: ImagemFindOneResultDto,
    },
  },
  //
});

// ======================================================

@ObjectType('Disciplina')
export class DisciplinaDto implements Dto.IDisciplinaModel {
  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_ID)
  id!: string;

  //

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_NOME)
  nome!: string;

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_CARGA_HORARIA)
  cargaHoraria!: number;

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_IMAGEM_CAPA_OUTPUT)
  imagemCapa!: Dto.IImagemModel | null;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
