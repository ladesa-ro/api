import { InputType, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CursoDto, CursoDtoProperties, CursoDtoValidationContract } from './curso.dto';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';

// ======================================================

@ObjectType('CursoFindOneResultDto')
export class CursoFindOneResultDto implements Dto.ICursoFindOneResultDto {
  @DtoProperty(CursoDtoProperties.CURSO_ID)
  id!: string;

  //

  @DtoProperty(CursoDtoProperties.CURSO_NOME)
  nome!: string;

  @DtoProperty(CursoDtoProperties.CURSO_NOME_ABREVIADO)
  nomeAbreviado!: string;

  @DtoProperty(CursoDtoProperties.CURSO_CAMPUS)
  campus!: CampusEntity;

  @DtoProperty(CursoDtoProperties.CURSO_MODALIDADE)
  modalidade!: ModalidadeEntity;

  //
}

// ======================================================

export const CursoFindOneByIdInputValidationContract = createValidationContract(() =>
  yup.object().shape({
    id: getSchemaField(CursoDtoValidationContract(), 'id'),
  }),
);

// ======================================================

@InputType('CursoFindOneByIdInputDto')
export class CursoFindOneByIdInputDto implements Dto.ICursoFindOneByIdInputDto {
  @DtoProperty(CursoDtoProperties.CURSO_ID)
  id!: string;
}

export const CURSO_FIND_ONE_BY_ID = createDtoOperationOptions({
  description: 'Realiza a consulta a "curso"" por ID.',

  gql: {
    name: 'cursoFindOneById',

    inputDtoType: () => CursoFindOneByIdInputDto,
    inputDtoValidationContract: CursoFindOneByIdInputValidationContract,

    returnType: () => CursoDto,
  },

  swagger: {
    returnType: CursoFindOneResultDto,

    params: [
      {
        name: 'id',
        description: 'ID da curso.',
        validationContract: ValidationContractUuid,
      },
    ],
  },
});
