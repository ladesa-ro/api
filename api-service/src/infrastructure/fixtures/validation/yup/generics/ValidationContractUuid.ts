import * as yup from "yup";
import { createValidationContract } from "../../createValidationContract";

export const ValidationContractUuid = createValidationContract(() => yup.string().uuid());

export const checkIsUuid = (input: string) => ValidationContractUuid().isValidSync(input);
