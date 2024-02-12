import { GqlArgYup } from '../adapters';
import { IDtoOperationOptions } from './DtoOperation';

export const GqlDtoInput = (options: IDtoOperationOptions) => {
  const { inputDtoType, inputDtoValidationContract } = options.gql;

  if (!inputDtoType) {
    throw new TypeError('Provide options.gql.inputDtoType');
  }

  if (!inputDtoValidationContract) {
    throw new TypeError('Provide options.gql.inputDtoValidationContract');
  }

  const schema = inputDtoValidationContract();

  return GqlArgYup('dto', schema, {
    type: inputDtoType,
    description: 'Dados de entrada da operação.',
  });
};
