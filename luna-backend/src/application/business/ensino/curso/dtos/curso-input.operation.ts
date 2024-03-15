import { InputType } from '@nestjs/graphql';
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

  @DtoProperty(CursoDtoProperties.CURSO_CAMPUS_INPUT)
  campus!: Dto.ICampusModel;

  @DtoProperty(CursoDtoProperties.CURSO_MODALIDADE_INPUT)
  modalidade!: Dto.IModalidadeModel;

  //
}
