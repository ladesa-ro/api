import * as yup from 'yup';
import { ContractGenericId } from './ContractGenericId';

export const ContractGenericObjectId = (
  required: boolean,
  message?: string,
) => {
  if (required) {
    return yup.object().shape({
      id: ContractGenericId.required(message),
    });
  }

  return yup
    .object()
    .shape({
      id: ContractGenericId.required(message),
    })
    .transform((value) => {
      const id = value?.id ?? null;

      if (id !== null && ContractGenericId.isValidSync(id)) {
        return value;
      }

      return null;
    })
    .nullable()
    .optional()
    .default(() => null);
};
