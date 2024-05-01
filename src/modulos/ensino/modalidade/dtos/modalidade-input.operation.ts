import * as Spec from '@sisgea/spec';
import * as yup from 'yup';
import { createValidationContract, getSchemaField } from '../../../../infraestrutura';
import { createEntityDtoClass } from '../../../../legacy/utils/createDtoClass';
import { ModalidadeDtoValidationContract } from './modalidade.dto';

// ======================================================

export const ModalidadeInputDtoValidationContract = createValidationContract(() => {
  const schema = ModalidadeDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    slug: getSchemaField(schema, 'slug'),
  });
});

// ======================================================

export const ModalidadeInputDto = createEntityDtoClass(Spec.ModalidadeInputDeclaration, 'input');

// ======================================================
