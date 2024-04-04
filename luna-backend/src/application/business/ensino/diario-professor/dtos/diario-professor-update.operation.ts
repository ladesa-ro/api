import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { DiarioProfessorFindOneByIdInputValidationContract, DiarioProfessorFindOneResultDto } from './diario-professor-find-one.operation';
import { DiarioProfessorInputDtoValidationContract } from './diario-professor-input.operation';
import { DiarioProfessorDto, DiarioProfessorDtoProperties } from './diario-professor.dto';

// ======================================================

export const DiarioProfessorUpdateInputDtoValidationContract = createValidationContract(() => {
  return yup.object().concat(DiarioProfessorFindOneByIdInputValidationContract()).concat(DiarioProfessorInputDtoValidationContract().partial().omit([])).shape({});
});

// ======================================================

@InputType('DiarioProfessorUpdateInputDto')
export class DiarioProfessorUpdateInputDto implements Dto.IDiarioProfessorUpdateDto {
  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_ID)
  id!: string;

  //

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_SITUACAO, { required: false })
  situacao?: boolean;

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_DIARIO, { required: false })
  diario?: Dto.IDiarioModel;

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_VINCULO_PROFESSOR, { required: false })
  vinculoProfessor?: Dto.IUsuarioVinculoCampusModel;

  //
}

export class DiarioProfessorUpdateWithoutIdInputDto extends OmitType(DiarioProfessorUpdateInputDto, ['id'] as const) {}
export const DIARIO_PROFESSOR_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de vínculo de diário e professor.',

  gql: {
    name: 'diarioProfessorUpdate',

    inputDtoType: () => DiarioProfessorUpdateInputDto,
    inputDtoValidationContract: DiarioProfessorUpdateInputDtoValidationContract,

    returnType: () => DiarioProfessorDto,
  },

  swagger: {
    inputBodyType: DiarioProfessorUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => DiarioProfessorUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de vínculo de diário e professor.',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: DiarioProfessorFindOneResultDto,
  },
});
