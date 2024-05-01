import { Int, ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { IAmbienteModel, IDisciplinaModel, ITurmaModel } from '@sisgea/spec';
import { AmbienteDto, AmbienteFindOneResultDto } from '@/nest-app/business/ambientes/ambiente/dtos';
import * as yup from 'yup';
import {
  CommonPropertyUuid,
  DtoProperty,
  ObjectUuidDto,
  ValidationContractNumber,
  ValidationContractObjectUuidBase,
  ValidationContractString,
  ValidationContractUuid,
  createDtoPropertyMap,
  createValidationContract,
} from '../../../../infraestrutura';
import { DisciplinaDto, DisciplinaFindOneResultDto } from '../../disciplina/dtos';
import { TurmaDto, TurmaFindOneResultDto } from '../../turma/dtos';

// ======================================================

export const DiarioDtoValidationContract = createValidationContract(() => {
  return yup.object({
    id: ValidationContractUuid(),

    //
    situacao: ValidationContractString().required().defined(), // diario
    ano: ValidationContractNumber().integer().positive().required(), // diario
    etapa: ValidationContractString().required().defined(), // diario
    //
    turma: ValidationContractObjectUuidBase({ required: true, optional: false }),
    disciplina: ValidationContractObjectUuidBase({ required: true, optional: false }),
    ambientePadrao: ValidationContractObjectUuidBase({ required: false, optional: false }),
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

  DIARIO_TURMA_OUTPUT: {
    nullable: false,
    description: 'Turma que o diario pertence',
    //
    gql: {
      type: () => TurmaDto,
    },
    swagger: {
      type: TurmaFindOneResultDto,
    },
  },

  DIARIO_TURMA_INPUT: {
    nullable: false,
    description: 'Turma que o diario pertence',
    //
    gql: {
      type: () => ObjectUuidDto,
    },
    swagger: {
      type: ObjectUuidDto,
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

  @DtoProperty(DiarioDtoProperties.DIARIO_TURMA_OUTPUT)
  turma!: ITurmaModel;

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA_OUTPUT)
  disciplina!: IDisciplinaModel;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO_OUTPUT)
  ambientePadrao!: IAmbienteModel | null;

  //

  dateCreated!: Dto.IEntityDate;
  dateUpdated!: Dto.IEntityDate;
  dateDeleted!: Dto.IEntityDate | null;
}
