import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { DiarioFindOneByIdInputValidationContract, DiarioFindOneResultDto } from './diario-find-one.operation';
import { DiarioInputDtoValidationContract } from './diario-input.operation';
import { DiarioDto, DiarioDtoProperties } from './diario.dto';
import { IDiarioUpdateDto } from '../../../(spec)';
import { TurmaEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/turma.entity';
import { DisciplinaEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/disciplina.entity';
import { AmbienteEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/ambiente.entity';

// ======================================================

export const DiarioUpdateInputDtoValidationContract = createValidationContract(() => {
  return yup.object().concat(DiarioFindOneByIdInputValidationContract()).concat(DiarioInputDtoValidationContract().partial().omit([])).shape({});
});

// ======================================================

@InputType('DiarioUpdateInputDto')
export class DiarioUpdateInputDto implements IDiarioUpdateDto {
  @DtoProperty(DiarioDtoProperties.DIARIO_ID)
  id!: string;

  //

  @DtoProperty(DiarioDtoProperties.DIARIO_SITUACAO, { required: false })
  situacao?: string;

  @DtoProperty(DiarioDtoProperties.DIARIO_ANO, { required: false })
  ano?: number;

  @DtoProperty(DiarioDtoProperties.DIARIO_ETAPA, { required: false })
  etapa?: string | null;

  @DtoProperty(DiarioDtoProperties.DIARIO_TURMA, { required: false })
  turma?: TurmaEntity;

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA, { required: false })
  disciplina?: DisciplinaEntity;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO, { required: false })
  ambientePadrao?: AmbienteEntity | null;

  //
}

export class DiarioUpdateWithoutIdInputDto extends OmitType(DiarioUpdateInputDto, ['id'] as const) { }
export const DIARIO_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de "diario".',

  gql: {
    name: 'diarioUpdate',

    inputDtoType: () => DiarioUpdateInputDto,
    inputDtoValidationContract: DiarioUpdateInputDtoValidationContract,

    returnType: () => DiarioDto,
  },

  swagger: {
    inputBodyType: DiarioUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => DiarioUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de "diario".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: DiarioFindOneResultDto,
  },
});
