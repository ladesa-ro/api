import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CursoDtoProperties, CursoDtoValidationContract } from './curso.dto';

// ======================================================

export const CursoDeleteOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CursoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('CursoDeleteOneByIdInputDto')
export class CursoDeleteOneByIdInputDto implements Dto.ICursoDeleteOneByIdInputDto {
  @DtoProperty(CursoDtoProperties.CURSO_ID)
  id!: string;
}

// ======================================================

export const CURSO_DELETE_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a remoção de "curso" por ID.',

  gql: {
    name: 'CursoDeleteOneById',

    inputDtoType: () => CursoDeleteOneByIdInputDto,
    inputDtoValidationContract: CursoDeleteOneByIdInputValidationContract,

    returnType: () => Boolean,
  },

  swagger: {
    returnType: Boolean,

    params: [
      {
        name: 'id',
        description: 'ID de "curso".',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});

// ======================================================
