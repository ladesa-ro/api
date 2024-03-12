import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import { DtoProperty, ValidationContractUuid, createDtoOperationOptions, createValidationContract } from '../../../../../infrastructure';
import { CursoFindOneByIdInputValidationContract, CursoFindOneResultDto } from './curso-find-one.operation';
import { CursoInputDtoValidationContract } from './curso-input.operation';
import { CursoDto, CursoDtoProperties } from './curso.dto';
import { ICursoUpdateDto } from '../../../(spec)';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';

// ======================================================

export const CursoUpdateInputDtoValidationContract = createValidationContract(() => {
  return yup
    .object()
    .concat(CursoFindOneByIdInputValidationContract())
    .concat(CursoInputDtoValidationContract().partial().omit([]))
    .shape({
    });
});

// ======================================================

@InputType('CursoUpdateInputDto')
export class CursoUpdateInputDto implements ICursoUpdateDto {
  @DtoProperty(CursoDtoProperties.CURSO_ID)
  id!: string;

  //

  @DtoProperty(CursoDtoProperties.CURSO_NOME, { required: false })
  nome?: string;

  @DtoProperty(CursoDtoProperties.CURSO_NOME_ABREVIADO, { required: false })
  nomeAbreviado?: string;

  @DtoProperty(CursoDtoProperties.CURSO_CAMPUS, { required: false })
  campus?: CampusEntity;

  @DtoProperty(CursoDtoProperties.CURSO_MODALIDADE, { required: false })
  modalidade?: ModalidadeEntity;

  //
}

export class CursoUpdateWithoutIdInputDto extends OmitType(CursoUpdateInputDto, ['id'] as const) { }
export const CURSO_UPDATE = createDtoOperationOptions({
  description: 'Realiza a alteração de uma "curso".',

  gql: {
    name: 'cursoUpdate',

    inputDtoType: () => CursoUpdateInputDto,
    inputDtoValidationContract: CursoUpdateInputDtoValidationContract,

    returnType: () => CursoDto,
  },

  swagger: {
    inputBodyType: CursoUpdateWithoutIdInputDto,

    inputBodyValidationContract: createValidationContract(() => CursoUpdateInputDtoValidationContract().omit(['id'])),

    params: [
      {
        name: 'id',
        description: 'ID da "curso".',
        validationContract: ValidationContractUuid,
      },
    ],

    returnType: CursoFindOneResultDto,
  },
});
