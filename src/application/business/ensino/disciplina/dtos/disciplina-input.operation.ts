import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { DisciplinaDtoProperties, DisciplinaDtoValidationContract } from './disciplina.dto';

// ======================================================

export const DisciplinaInputDtoValidationContract = createValidationContract(() => {
  const schema = DisciplinaDtoValidationContract();

  return yup.object().shape({
    //

    nome: getSchemaField(schema, 'nome'),

    cargaHoraria: getSchemaField(schema, 'cargaHoraria'),

    //
  });
});

// ======================================================

@InputType('DisciplinaInputDto')
export class DisciplinaInputDto implements Dto.IDisciplinaInputDto {
  //

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_NOME)
  nome!: string;

  @DtoProperty(DisciplinaDtoProperties.DISCIPLINA_CARGA_HORARIA)
  cargaHoraria!: number;

  //
}
