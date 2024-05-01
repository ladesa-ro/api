import * as yup from 'yup';
import { createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { CampusDtoValidationContract } from './campus.dto';

// ======================================================

export const CampusInputDtoValidationContract = createValidationContract(() => {
  const schema = CampusDtoValidationContract();

  return yup.object().shape({
    nomeFantasia: getSchemaField(schema, 'nomeFantasia'),
    razaoSocial: getSchemaField(schema, 'razaoSocial'),
    apelido: getSchemaField(schema, 'apelido'),
    cnpj: getSchemaField(schema, 'cnpj'),
  });
});

// ======================================================

// ======================================================
