import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import * as yup from 'yup';
import { createDtoOperationOptions, createValidationContract, DtoProperty, ValidationContractObjectUuidBase, ValidationContractUuid } from '../../../../infraestrutura';
import { DiarioFindOneByIdInputValidationContract, DiarioFindOneResultDto } from './diario-find-one.operation';
import { DiarioInputDtoValidationContract } from './diario-input.operation';
import { DiarioDto, DiarioDtoProperties } from './diario.dto';

// ======================================================

export const DiarioUpdateInputDtoValidationContract = createValidationContract(() => {
  const schema = DiarioInputDtoValidationContract();

  return (
    yup
      //
      .object()
      .concat(DiarioFindOneByIdInputValidationContract())
      .concat(schema.pick(['situacao', 'ano', 'etapa']).partial())
      .shape({
        turma: ValidationContractObjectUuidBase({ required: true, optional: true }),
        disciplina: ValidationContractObjectUuidBase({ required: true, optional: true }),
        ambientePadrao: ValidationContractObjectUuidBase({ required: false, optional: true }),
      })
  );
});

// ======================================================

@InputType('DiarioUpdateInputDto')
export class DiarioUpdateInputDto implements Dto.IDiarioUpdateDto {
  @DtoProperty(DiarioDtoProperties.DIARIO_ID)
  id!: string;

  //

  @DtoProperty(DiarioDtoProperties.DIARIO_SITUACAO, { required: false })
  situacao?: string;

  @DtoProperty(DiarioDtoProperties.DIARIO_ANO, { required: false })
  ano?: number;

  @DtoProperty(DiarioDtoProperties.DIARIO_ETAPA, { required: false })
  etapa?: string | null;

  @DtoProperty(DiarioDtoProperties.DIARIO_TURMA_INPUT, { required: false })
  turma?: Dto.IObjectUuid;

  @DtoProperty(DiarioDtoProperties.DIARIO_DISCIPLINA_INPUT, { required: false })
  disciplina?: Dto.IObjectUuid;

  @DtoProperty(DiarioDtoProperties.DIARIO_AMBIENTE_PADRAO_INPUT, { required: false })
  ambientePadrao?: Dto.IObjectUuid | null;

  //
}

export class DiarioUpdateWithoutIdInputDto extends OmitType(DiarioUpdateInputDto, ['id'] as const) {}

export const DIARIO_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de "diario".',

  gql: {
    name: 'diarioUpdate',

    inputDtoType: () => DiarioUpdateInputDto,
    inputDtoValidationContract: DiarioUpdateInputDtoValidationContract,

    returnType: () => DiarioDto,
  },

  swagger: {
    inputBodyType: DiarioUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => DiarioUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID de "diario".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: DiarioFindOneResultDto,
  },
});
