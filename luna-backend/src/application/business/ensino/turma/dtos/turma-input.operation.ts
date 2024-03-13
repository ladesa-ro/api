import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { TurmaDtoProperties, TurmaDtoValidationContract } from './turma.dto';

// ======================================================

export const TurmaInputDtoValidationContract = createValidationContract(() => {
  const schema = TurmaDtoValidationContract();

  return yup.object().shape({
    //

    periodo: getSchemaField(schema, 'periodo'),

    grupo: getSchemaField(schema, 'grupo'),

    nome: getSchemaField(schema, 'nome'),

    ambientePadraoAula: getSchemaField(schema, 'ambientePadraoAula'),

    curso: getSchemaField(schema, 'curso'),

    //
  });
});

// ======================================================

@InputType('TurmaInputDto')
export class TurmaInputDto implements Dto.ITurmaInputDto {
  //

  @DtoProperty(TurmaDtoProperties.TURMA_PERIODO)
  periodo!: string;

  @DtoProperty(TurmaDtoProperties.TURMA_GRUPO)
  grupo!: string;

  @DtoProperty(TurmaDtoProperties.TURMA_NOME)
  nome!: string;

  @DtoProperty(TurmaDtoProperties.TURMA_AMBIENTE_PADRAO_AULA_INPUT)
  ambientePadraoAula!: Dto.IObjectUuid | null;

  @DtoProperty(TurmaDtoProperties.TURMA_CURSO_INPUT)
  curso!: Dto.IObjectUuid;

  //
}
