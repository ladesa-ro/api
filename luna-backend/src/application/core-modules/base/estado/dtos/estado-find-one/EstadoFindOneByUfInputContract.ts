import * as yup from 'yup';
import { ContractGenericString } from '../../../../../../infrastructure';

export const EstadoFindOneByUfInputContract = () => {
  return yup.object().shape({
    uf: ContractGenericString.length(2)
      .uppercase()
      .test('is-valid-uf', (value) => {
        if (typeof value === 'string') {
          return value.match(/^[a-zA-Z]{2}$/) !== null;
        }

        return false;
      }),
  });
};
