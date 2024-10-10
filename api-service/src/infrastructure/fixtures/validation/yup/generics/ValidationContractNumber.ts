import * as yup from "yup";
import { createValidationContract } from "../../createValidationContract";

export const ValidationContractNumber = createValidationContract(() =>
  yup.number().transform((value) => {
    const valueAsNumber = +value;

    if (!Number.isNaN(valueAsNumber)) {
      return valueAsNumber;
    }

    return null;
  }),
);
