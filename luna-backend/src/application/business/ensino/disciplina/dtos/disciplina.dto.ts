import { Int, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import {
  CommonPropertyUuid,
  DtoProperty,
  ValidationContractNumber,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../../infrastructure';

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

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
