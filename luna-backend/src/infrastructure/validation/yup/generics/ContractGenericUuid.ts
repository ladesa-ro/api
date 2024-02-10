import * as yup from 'yup';

export const ContractGenericUuid = yup.string().uuid();

export const checkIsUuid = (input: string) =>
  ContractGenericUuid.isValidSync(input);
