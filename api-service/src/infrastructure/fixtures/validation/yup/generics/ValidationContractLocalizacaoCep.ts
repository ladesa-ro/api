import { createValidationContract } from "../../createValidationContract";
import { ValidationContractString } from "./ValidationContractString";

const CEP_PATTERN = /^((\d{5}-\d{3})|(\d{8}))$/;

type IValidationContractLocalizacaoCepOptions = {
  required?: boolean | string;
  output?: "clean" | "formatted" | "passthrough";
};

export const ValidationContractLocalizacaoCep = createValidationContract((options: IValidationContractLocalizacaoCepOptions = {}) => {
  const { required = false, output = "formatted" } = options;

  let base = ValidationContractString()
    .transform((value) => {
      if (typeof value === "string") {
        if (value.length === 0) {
          return null;
        }

        if (output === "passthrough") {
          return value;
        }

        if (output === "clean" || output === "formatted") {
          const clean = value.replace(/\D/g, "");

          if (output === "formatted" && clean.length > 5) {
            return `${clean.slice(0, 5)}-${clean.slice(5)}`;
          }

          return clean;
        }
      }

      return null;
    })
    .test("is-valid-cep", "Informe um CEP válido!", (value) => {
      if (typeof value === "string" && value.length > 0) {
        const isValid = value.match(CEP_PATTERN) !== null;
        return isValid;
      }

      if (required !== false) {
        return false;
      }

      return true;
    });

  if (required !== false) {
    if (required === true) {
      base = base.required();
    } else {
      base = base.required(required);
    }
  }

  return base;
});
