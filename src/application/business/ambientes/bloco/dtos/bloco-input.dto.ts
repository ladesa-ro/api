import * as yup from 'yup';
import { createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { BlocoDtoValidationContract } from './bloco.dto';

// ======================================================

export const BlocoInputDtoValidationContract = createValidationContract(() => {
  const schema = BlocoDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    codigo: getSchemaField(schema, 'codigo'),
  });
});
