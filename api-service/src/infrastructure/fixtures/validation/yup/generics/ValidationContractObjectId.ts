import * as yup from "yup";
import { createValidationContract } from "../../createValidationContract";
import { ValidationContractId } from "./ValidationContractId";

interface IValidationContractObjectIdOptions {
  required?: boolean;
  message?: string;
}

export const ValidationContractObjectId = createValidationContract((options: IValidationContractObjectIdOptions = {}) => {
  const { required = true, message } = options;

  if (required) {
    return yup.object().shape({
      id: ValidationContractId().required(message),
    });
  }

  return yup
    .object()
    .shape({
      id: ValidationContractId().required(message),
    })
    .transform((value) => {
      const id = value?.id ?? null;

      if (id !== null && ValidationContractId().isValidSync(id)) {
        return value;
      }

      return null;
    })
    .nullable()
    .optional()
    .default(() => null);
});
