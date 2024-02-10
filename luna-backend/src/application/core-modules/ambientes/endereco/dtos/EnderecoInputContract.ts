import * as yup from 'yup';
import {
  ContractGenericLocalizacaoCep,
  ContractGenericNumber,
  ContractGenericObjectId,
  ContractGenericString,
} from '../../../../../infrastructure';

export const EnderecoInputContract = () => {
  return yup.object().shape({
    cep: ContractGenericLocalizacaoCep(),

    logradouro: ContractGenericString,
    numero: ContractGenericNumber.integer().positive(),

    bairro: ContractGenericString,

    complemento: ContractGenericString.nullable().default(() => null),
    pontoReferencia: ContractGenericString.nullable().default(() => null),

    cidade: ContractGenericObjectId(true),
  });
};
