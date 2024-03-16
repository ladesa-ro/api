import { Int, ObjectType } from '@nestjs/graphql';
import { AmbienteDto, AmbienteFindOneResultDto } from 'application/business/ambientes/ambiente/dtos';
import { AmbienteEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/ambiente.entity';
import { DisciplinaEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/disciplina.entity';
import { TurmaEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/turma.entity';
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
import { DisciplinaDto, DisciplinaFindOneResultDto } from '../../disciplina/dtos';
import { TurmaDto, TurmaFindOneResultDto } from '../../turma/dtos';

// ======================================================

export const DiarioDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //

    situacao: yup.mixed(), // diario

    ano: yup.mixed(), // diario

    etapa: yup.mixed(), // diario

    turma: yup.mixed(), // diario

    disciplina: yup.mixed(), // diario

    ambientePadrao: yup.mixed(), // diario

    //
  });
});

// ======================================================

export const DiarioDtoProperties = createDtoPropertyMap({
  DIARIO_ID: CommonPropertyUuid('ID de "diario"'),

  //

  DIARIO_SITUACAO: {
    nullable: false,
    description: 'Situação do diário. Ativo ou inativo.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  DIARIO_ANO: {
    nullable: false,
    description: 'Ano do diário.',
    //
    gql: {
      type: () => Int,
    },
    swagger: {
      type: 'integer',
    },
  },
  DIARIO_ETAPA: {
    nullable: true,
    description: 'Etapa/período do diário.',
    //
    gql: {
      type: () => String,
    },
    swagger: {
      type: 'string',
    },
  },
  DIARIO_TURMA: {
    nullable: false,
    description: 'turma que o diario pertence',
    //
    gql: {
      type: () => TurmaDto,
    },
    swagger: {
      type: TurmaFindOneResultDto,
    },
  },

  // =======================
  DIARIO_DISCIPLINA_OUTPUT: {
    nullable: false,
    description: 'disciplina a qual o diario pertence',
    //
    gql: {
      type: () => DisciplinaDto,
    },
    swagger: {
      type: DisciplinaFindOneResultDto,
    },
  },


  // =======================
  DIARIO_DISCIPLINA_INPUT: {
    nullable: false,
    description: 'disciplina a qual o diario pertence',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },


  // =======================
  DIARIO_AMBIENTE_PADRAO_INPUT: {
    nullable: true,
    description: 'Ambiente Padrao do diario',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
    },
  },


  // =======================
  DIARIO_AMBIENTE_PADRAO_OUTPUT: {
    nullable: true,
    description: 'Ambiente Padrao do diario',
    //
    gql: {
      type: () => AmbienteDto,
    },
    swagger: {
      type: AmbienteFindOneResultDto,
    },
  },
  //
});

// ======================================================

@ObjectType('Diario')
export class DiarioDto implements Dto.IDiarioModel {
  @DtoProperty(DiarioDtoProperties.DIARIO_ID)
  id!: string;

  //

  @DtoProperty(DiarioDtoProperties.DIARIO_SITUACAO)
  situacao!: string;

  @DtoProperty(DiarioDtoProperties.DIARIO_ANO)
  ano!: number;

  @DtoProperty(DiarioDtoProperties.DIARIO_ETAPA)
  etapa!: string | null;

  @DtoProperty(DiarioDtoProperties.DIARIO_TURMA)
  turma!: TurmaEntity;

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA_OUTPUT)
  disciplina!: DisciplinaEntity;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO_OUTPUT)
  ambientePadrao!: AmbienteEntity | null;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
