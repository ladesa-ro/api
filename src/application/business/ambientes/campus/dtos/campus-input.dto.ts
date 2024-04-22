import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { createValidationContract, getSchemaField } from '../../../../../infrastructure';
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

export const CampusInputDto = createEntityDtoClass(Spec.CampusInputDeclaration, 'input');

// ======================================================
