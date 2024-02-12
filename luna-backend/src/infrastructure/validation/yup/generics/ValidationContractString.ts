import * as yup from 'yup';
import { createValidationContract } from '../../createValidationContract';

export const ValidationContractString = createValidationContract(() =>
  yup.string().trim(),
);
