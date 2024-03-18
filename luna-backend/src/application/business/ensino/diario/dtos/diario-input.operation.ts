import { InputType } from '@nestjs/graphql';
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

  @DtoProperty(DiarioDtoProperties.DIARIO_TURMA_INPUT)
  turma!: IObjectUuid;

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA_INPUT)
  disciplina!: IObjectUuid;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO_INPUT)
  ambientePadrao!: IObjectUuid | null;

  //
}
