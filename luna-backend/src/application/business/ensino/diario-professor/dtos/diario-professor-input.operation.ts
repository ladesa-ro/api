import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { DiarioProfessorDtoProperties, DiarioProfessorDtoValidationContract } from './diario-professor.dto';

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

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_DIARIO)
  diario!: Dto.IDiarioModel;

  @DtoProperty(DiarioProfessorDtoProperties.DIARIO_PROFESSOR_VINCULO_PROFESSOR)
  vinculoProfessor!: Dto.IUsuarioVinculoCampusModel;

  //
}
