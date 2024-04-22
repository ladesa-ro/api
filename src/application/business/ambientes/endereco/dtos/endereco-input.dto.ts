import * as Spec from '@sisgea/spec';
import { createEntityDtoClass } from 'infrastructure/utils/createDtoClass';
import * as yup from 'yup';
import { createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { EnderecoDtoValidationContract } from './endereco.dto';

// ======================================================

export const EnderecoInputDtoValidationContract = createValidationContract(() => {
  const schema = EnderecoDtoValidationContract();

  return yup.object().shape({
    cep: getSchemaField(schema, 'cep'),

    logradouro: getSchemaField(schema, 'logradouro'),
    numero: getSchemaField(schema, 'numero'),
    bairro: getSchemaField(schema, 'bairro'),
    complemento: getSchemaField(schema, 'complemento'),
    pontoReferencia: getSchemaField(schema, 'pontoReferencia'),

    cidade: getSchemaField(schema, 'cidade'),
  });
});

// ======================================================

export const EnderecoInputDto = createEntityDtoClass(Spec.EnderecoInputDeclaration, 'input');

// ======================================================
