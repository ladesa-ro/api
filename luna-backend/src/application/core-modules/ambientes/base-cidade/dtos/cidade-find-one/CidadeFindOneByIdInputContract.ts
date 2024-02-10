import * as yup from 'yup';
import { ContractGenericId } from '../../../../../../infrastructure';

export const CidadeFindOneByIdInputContract = () => {
  return yup.object().shape({
    id: ContractGenericId,
  });
};
