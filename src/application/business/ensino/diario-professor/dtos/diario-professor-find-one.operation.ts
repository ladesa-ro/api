import { InputType, ObjectType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { DiarioProfessorDto, DiarioProfessorDtoProperties, DiarioProfessorDtoValidationContract } from './diario-professor.dto';

// ======================================================

@ObjectType('DiarioProfessorFindOneResultDto')
export class DiarioProfessorFindOneResultDto implements Dto.IDiarioProfessorFindOneResultDto {
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
}

// ======================================================

export const DiarioProfessorFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(DiarioProfessorDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('DiarioProfessorFindOneByIdInputDto')
export class DiarioProfessorFindOneByIdInputDto implements Dto.IDiarioProfessorFindOneByIdInputDto {
  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_ID)
  id!: string;
}

export const DIARIO_PROFESSOR_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um vínculo de diario e professor por ID.',

  gql: {
    name: 'diarioProfessorFindOneById',

    inputDtoType: () => DiarioProfessorFindOneByIdInputDto,
    inputDtoValidationContract: DiarioProfessorFindOneByIdInputValidationContract,

    returnType: () => DiarioProfessorDto,
  },

  swagger: {
    returnType: DiarioProfessorFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID do vínculo de diario e professor.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
