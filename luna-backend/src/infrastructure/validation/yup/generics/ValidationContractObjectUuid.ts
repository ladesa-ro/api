import * as yup from 'yup';
import { createValidationContract } from '../../createValidationContract';
import { ValidationContractUuid } from './ValidationContractUuid';

interface IValidationContractObjectUuidOptions {
  required?: boolean;
  message?: string;
}

export const ValidationContractObjectUuid = createValidationContract(
  (options: IValidationContractObjectUuidOptions = {}) => {
    const { required = true, message } = options;

    if (required) {
      return yup.object().shape({
        id: ValidationContractUuid().required(message),
      });
    }

    return yup
      .object()
      .shape({
        id: ValidationContractUuid().required(message),
      })
      .transform((value) => {
        const id = value?.id ?? null;

        if (id !== null && ValidationContractUuid().isValidSync(id)) {
          return value;
        }

        return null;
      })
      .nullable()
      .optional()
      .default(() => null);
  },
);
