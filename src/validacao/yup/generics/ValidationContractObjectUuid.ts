import * as yup from 'yup';
import { createValidationContract } from '../../createValidationContract';
import { ValidationContractUuid } from './ValidationContractUuid';

interface IValidationContractObjectUuidOptions {
  /**
   * @deprecated será substituido por strict
   */
  required?: boolean;
  optional?: boolean;
  message?: string;
}

export const ValidationContractObjectUuidBase = createValidationContract((options: IValidationContractObjectUuidOptions = {}) => {
  const { required = true, optional = false, message } = options;

  const idSchema = ValidationContractUuid().required(message);

  const objectSchema = yup
    .object()
    .shape({ id: idSchema })
    .transform((value) => {
      const id = value?.id ?? null;

      if (id !== null && idSchema.isValidSync(id)) {
        return value;
      }

      return null;
    });

  const objectSchemaWithRequiredOption = required ? objectSchema.nonNullable().required() : objectSchema.nullable();

  const objectSchemaWithOptionallity = optional ? objectSchemaWithRequiredOption.optional().default(() => undefined) : objectSchemaWithRequiredOption.defined();

  return objectSchemaWithOptionallity;
});

export const ValidationContractObjectUuid = createValidationContract((options: IValidationContractObjectUuidOptions = {}) => {
  const { required: required = true, message } = options;

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
});
