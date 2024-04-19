import { InputType } from '@nestjs/graphql';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractObjectUuidBase, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { TurmaDtoProperties, TurmaDtoValidationContract } from './turma.dto';

// ======================================================

export const TurmaInputDtoValidationContract = createValidationContract(() => {
  const schema = TurmaDtoValidationContract();

  return yup.object().shape({
    //

    periodo: getSchemaField(schema, 'periodo'),
    grupo: getSchemaField(schema, 'grupo'),
    nome: getSchemaField(schema, 'nome'),

    ambientePadraoAula: ValidationContractObjectUuidBase({ required: false }),
    curso: ValidationContractObjectUuidBase({ required: true }),

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
