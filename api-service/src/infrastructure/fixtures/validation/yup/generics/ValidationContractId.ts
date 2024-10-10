import { createValidationContract } from "../../createValidationContract";
import { ValidationContractNumber } from "./ValidationContractNumber";

export const ValidationContractId = createValidationContract(() => ValidationContractNumber().integer().positive());
