import { InputType, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { TurmaDto, TurmaDtoProperties, TurmaDtoValidationContract } from './turma.dto';

// ======================================================

@ObjectType('TurmaFindOneResultDto')
export class TurmaFindOneResultDto implements Dto.ITurmaFindOneResultDto {
  @DtoProperty(TurmaDtoProperties.TURMA_ID)
  id!: string;

  //

  @DtoProperty(TurmaDtoProperties.TURMA_PERIODO)
  periodo!: string;

  @DtoProperty(TurmaDtoProperties.TURMA_GRUPO)
  grupo!: string;

  @DtoProperty(TurmaDtoProperties.TURMA_NOME)
  nome!: string;

  @DtoProperty(TurmaDtoProperties.TURMA_AMBIENTE_PADRAO_AULA_OUTPUT)
  ambientePadraoAula!: Dto.IAmbienteFindOneResultDto | null;

  @DtoProperty(TurmaDtoProperties.TURMA_CURSO_OUTPUT)
  curso!: Dto.ICursoFindOneResultDto;

  @DtoProperty(TurmaDtoProperties.TURMA_IMAGEM_CAPA_OUTPUT)
  imagemCapa!: Dto.IImagemModel | null;

  //
}

// ======================================================

export const TurmaFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(TurmaDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('TurmaFindOneByIdInputDto')
export class TurmaFindOneByIdInputDto implements Dto.ITurmaFindOneByIdInputDto {
  @DtoProperty(TurmaDtoProperties.TURMA_ID)
  id!: string;
}

export const TURMA_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a "turma"" por ID.',

  gql: {
    name: 'turmaFindOneById',

    inputDtoType: () => TurmaFindOneByIdInputDto,
    inputDtoValidationContract: TurmaFindOneByIdInputValidationContract,

    returnType: () => TurmaDto,
  },

  swagger: {
    returnType: TurmaFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da turma.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
