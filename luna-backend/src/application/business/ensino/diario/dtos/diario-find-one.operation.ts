import { InputType, ObjectType } from '@nestjs/graphql';
import { AmbienteEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/ambiente.entity';
import { DisciplinaEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/disciplina.entity';
import { TurmaEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/turma.entity';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { DiarioDto, DiarioDtoProperties, DiarioDtoValidationContract } from './diario.dto';

// ======================================================

@ObjectType('DiarioFindOneResultDto')
export class DiarioFindOneResultDto implements Dto.IDiarioFindOneResultDto {
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

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA)
  disciplina!: DisciplinaEntity;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO)
  ambientePadrao!: AmbienteEntity | null;

  //
}

// ======================================================

export const DiarioFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(DiarioDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('DiarioFindOneByIdInputDto')
export class DiarioFindOneByIdInputDto implements Dto.IDiarioFindOneByIdInputDto {
  @DtoProperty(DiarioDtoProperties.DIARIO_ID)
  id!: string;
}

export const DIARIO_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a "diario"" por ID.',

  gql: {
    name: 'diarioFindOneById',

    inputDtoType: () => DiarioFindOneByIdInputDto,
    inputDtoValidationContract: DiarioFindOneByIdInputValidationContract,

    returnType: () => DiarioDto,
  },

  swagger: {
    returnType: DiarioFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da diario.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
