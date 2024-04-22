import { CursoInputDeclaration } from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { CursoDtoValidationContract } from './curso.dto';

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

export const CursoInputDto = createEntityDtoClass(CursoInputDeclaration, 'input');
