import * as yup from 'yup';
import { ContractGenericUuid } from './ContractGenericUuid';

export const ContractGenericObjectUuid = (
  required: boolean,
  message?: string,
) => {
  if (required) {
    return yup.object().shape({
      id: ContractGenericUuid.required(message),
    });
  }

  return yup
    .object()
    .shape({
      id: ContractGenericUuid.required(message),
    })
    .transform((value) => {
      const id = value?.id ?? null;

      if (id !== null && ContractGenericUuid.isValidSync(id)) {
        return value;
      }

      return null;
    })
    .nullable()
    .optional()
    .default(() => null);
};
