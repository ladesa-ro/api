import { InputType } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, ValidationContractId, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CidadeDto, CidadeDtoProperties, CidadeDtoValidationContract } from './cidade.dto';

// ======================================================

export class CidadeFindOneResultDto implements Spec.ICidadeFindOneResultDto {
  @DtoProperty(CidadeDtoProperties.CIDADE_ID)
  id!: number;

  @DtoProperty(CidadeDtoProperties.CIDADE_NOME)
  nome!: string;

  @DtoProperty(CidadeDtoProperties.CIDADE_ESTADO_OUTPUT)
  estado!: Spec.IEstadoFindOneByIdResultDto;
}

// ================

export const CidadeFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CidadeDtoValidationContract(), 'id'),
  }),
);

// ================

@InputType('CidadeFindOneByIdInputDto')
export class CidadeFindOneByIdInputDto implements Spec.ICidadeFindOneByIdInputDto {
  @DtoProperty(CidadeDtoProperties.CIDADE_ID)
  id!: number;
}

// ================

export const CIDADE_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Retorna a consulta a uma cidade por ID IBGE.',

  gql: {
    name: 'cidadeFindOneById',
    returnType: () => CidadeDto,

    inputDtoType: () => CidadeFindOneByIdInputDto,
    inputDtoValidationContract: CidadeFindOneByIdInputValidationContract,
  },

  swagger: {
    returnType: CidadeFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID IBGE da Cidade.',
        validationContract: ValidationContractId,
      },
    ],
  },
});

// ======================================================
