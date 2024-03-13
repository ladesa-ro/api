import { InputType, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { IAmbienteFindOneResultDto, IBlocoFindOneResultDto } from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { AmbienteDto, AmbienteDtoProperties, AmbienteDtoValidationContract } from './ambiente.dto';

// ======================================================

@ObjectType('AmbienteFindOneResultDto')
export class AmbienteFindOneResultDto implements IAmbienteFindOneResultDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;

  //

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_NOME)
  nome!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_DESCRICAO)
  descricao!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CODIGO)
  codigo!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CAPACIDADE)
  capacidade!: number | null;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_TIPO)
  tipo!: string | null;

  //

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_BLOCO_OUTPUT)
  bloco!: IBlocoFindOneResultDto;
}

// ======================================================

export const AmbienteFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(AmbienteDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('AmbienteFindOneByIdInputDto')
export class AmbienteFindOneByIdInputDto implements Dto.IAmbienteFindOneByIdInputDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;
}

// ======================================================

export const AMBIENTE_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a um ambiente por ID.',

  gql: {
    name: 'ambienteFindOneById',

    inputDtoType: () => AmbienteFindOneByIdInputDto,
    inputDtoValidationContract: AmbienteFindOneByIdInputValidationContract,

    returnType: () => AmbienteDto,
  },

  swagger: {
    returnType: AmbienteFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID do ambiente.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
