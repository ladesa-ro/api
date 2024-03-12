import { InputType } from '@nestjs/graphql';
import { CampusEntity } from 'infrastructure/integrate-database/typeorm/entities/ambientes/campus.entity';
import { ModalidadeEntity } from 'infrastructure/integrate-database/typeorm/entities/ensino/ensino/modalidade.entity';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CursoDtoProperties, CursoDtoValidationContract } from './curso.dto';

// ======================================================

export const CursoInputDtoValidationContract = createValidationContract(() => {
  const schema = CursoDtoValidationContract();

  return yup.object().shape({
    //

    nome: getSchemaField(schema, 'nome'),

    nomeAbreviado: getSchemaField(schema, 'nomeAbreviado'),

    campus: getSchemaField(schema, 'campus'),

    modalidade: getSchemaField(schema, 'modalidade'),

    //
  });
});

// ======================================================

@InputType('CursoInputDto')
export class CursoInputDto implements Dto.ICursoInputDto {
  //

  @DtoProperty(CursoDtoProperties.CURSO_NOME)
  nome!: string;

  @DtoProperty(CursoDtoProperties.CURSO_NOME_ABREVIADO)
  nomeAbreviado!: string;

  @DtoProperty(CursoDtoProperties.CURSO_CAMPUS_OUTPUT)
  campus!: CampusEntity;

  @DtoProperty(CursoDtoProperties.CURSO_MODALIDADE_OUTPUT)
  modalidade!: ModalidadeEntity;

  //
}
