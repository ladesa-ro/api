import * as yup from 'yup';
import { ContractGenericId } from '../../../../../../infrastructure';

export const EstadoFindOneByIdInputContract = () => {
  return yup.object().shape({
    id: ContractGenericId,
  });
};
