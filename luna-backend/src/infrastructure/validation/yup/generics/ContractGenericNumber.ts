import * as yup from 'yup';

export const ContractGenericNumber = yup.number().transform((value) => {
  const valueAsNumber = +value;

  if (!Number.isNaN(valueAsNumber)) {
    return valueAsNumber;
  }

  return null;
});
