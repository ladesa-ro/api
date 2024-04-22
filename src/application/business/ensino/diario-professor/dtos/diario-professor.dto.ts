import { ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { CommonPropertyUuid, DtoProperty, ObjectUuidDto, ValidationContractUuid, createDtoPropertyMap, createValidationContract } from '../../../../../infrastructure';
import { UsuarioVinculoCampusDto, UsuarioVinculoCampusFindOneResultDto } from '../../../autenticacao/usuario-vinculo-campus/dtos';
import { DiarioDto, DiarioFindOneResultDto } from '../../diario/dtos';

// ======================================================

export const DiarioProfessorDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    situacao: yup.bool(),
    //
  });
});

// ======================================================

export const DiarioProfessorDtoProperties = createDtoPropertyMap({
  DIARIO_PROFESSOR_ID: CommonPropertyUuid('ID de "diario professor"'),

  //

  DIARIO_PROFESSOR_SITUACAO: {
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

  DIARIO_PROFESSOR_DIARIO_INPUT: {
    nullable: false,
    description: 'Diário do vínculo.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },

  DIARIO_PROFESSOR_DIARIO_OUTPUT: {
    nullable: false,
    description: 'Diário do vínculo.',
    //
    gql: {
      type: () => DiarioDto,
    },
    swagger: {
      type: DiarioFindOneResultDto,
    },
  },

  DIARIO_PROFESSOR_VINCULO_PROFESSOR_INPUT: {
    nullable: false,
    description: 'Vínculo de usuário-professor.',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },

  DIARIO_PROFESSOR_VINCULO_PROFESSOR_OUTPUT: {
    nullable: false,
    description: 'Vínculo de usuário-professor.',
    //
    gql: {
      type: () => UsuarioVinculoCampusDto,
    },
    swagger: {
      type: UsuarioVinculoCampusFindOneResultDto,
    },
  },
  //
});

// ======================================================

@ObjectType('DiarioProfessor')
export class DiarioProfessorDto implements Dto.IDiarioProfessorModel {
  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_ID)
  id!: string;

  //

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_SITUACAO)
  situacao!: boolean;

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_DIARIO_OUTPUT)
  diario!: Dto.IDiarioModel;

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_VINCULO_PROFESSOR_OUTPUT)
  vinculoProfessor!: Dto.IUsuarioVinculoCampusModel;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
