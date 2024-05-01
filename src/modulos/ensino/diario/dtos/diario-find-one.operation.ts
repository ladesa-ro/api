import { InputType, ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import { IAmbienteModel, IDisciplinaModel } from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../infraestrutura';
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

  @DtoProperty(DiarioDtoProperties.DIARIO_TURMA_OUTPUT)
  turma!: Dto.ITurmaModel;

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA_OUTPUT)
  disciplina!: IDisciplinaModel;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO_OUTPUT)
  ambientePadrao!: IAmbienteModel | null;

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
  description: 'Realiza a consulta a um diario por ID.',

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
