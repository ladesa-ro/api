import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DiarioProfessorDtoProperties, DiarioProfessorDtoValidationContract } from './diario-professor.dto';
import { DtoProperty } from '../../../../legacy';
import { createValidationContract, getSchemaField } from '../../../../validacao';

// ======================================================

export const DiarioProfessorInputDtoValidationContract = createValidationContract(() => {
  const schema = DiarioProfessorDtoValidationContract();

  return yup.object().shape({
    //
    situacao: getSchemaField(schema, 'situacao'),
    //
  });
});

// ======================================================

@InputType('DiarioProfessorInputDto')
export class DiarioProfessorInputDto implements Dto.IDiarioProfessorInputDto {
  //

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_SITUACAO)
  situacao!: boolean;

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_DIARIO_INPUT)
  diario!: Dto.IObjectUuid;

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_VINCULO_PROFESSOR_INPUT)
  vinculoProfessor!: Dto.IObjectUuid;

  //
}
