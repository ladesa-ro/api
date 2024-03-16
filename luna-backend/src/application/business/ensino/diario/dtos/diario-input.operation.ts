import { InputType } from '@nestjs/graphql';
import { TurmaEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/turma.entity';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { IObjectUuid } from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { DiarioDtoProperties, DiarioDtoValidationContract } from './diario.dto';

// ======================================================

export const DiarioInputDtoValidationContract = createValidationContract(() => {
  const schema = DiarioDtoValidationContract();

  return yup.object().shape({
    //

    situacao: getSchemaField(schema, 'situacao'),

    ano: getSchemaField(schema, 'ano'),

    etapa: getSchemaField(schema, 'etapa'),

    turma: getSchemaField(schema, 'turma'),

    disciplina: getSchemaField(schema, 'disciplina'),

    ambientePadrao: getSchemaField(schema, 'ambientePadrao'),

    //
  });
});

// ======================================================

@InputType('DiarioInputDto')
export class DiarioInputDto implements Dto.IDiarioInputDto {
  //

  @DtoProperty(DiarioDtoProperties.DIARIO_SITUACAO)
  situacao!: string;

  @DtoProperty(DiarioDtoProperties.DIARIO_ANO)
  ano!: number;

  @DtoProperty(DiarioDtoProperties.DIARIO_ETAPA)
  etapa!: string | null;

  @DtoProperty(DiarioDtoProperties.DIARIO_TURMA)
  turma!: TurmaEntity;

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA_INPUT)
  disciplina!: IObjectUuid;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO_INPUT)
  ambientePadrao!: IObjectUuid | null;

  //
}
