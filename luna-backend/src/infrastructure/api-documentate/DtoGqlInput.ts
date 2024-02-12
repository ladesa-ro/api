import { ArgsOptions } from '@nestjs/graphql/dist/decorators/args.decorator';
import { Schema } from 'yup';
import { GqlArgYup } from '../adapters';
import { IValidationContract } from '../validation';

interface DtoGqlInputOptions {
  type: ArgsOptions['type'];
  validationContract: IValidationContract<any, Schema<any, any>>;
}

export const DtoGqlInput = (options: DtoGqlInputOptions) => {
  const schema = options.validationContract();

  return GqlArgYup('dto', schema, {
    type: options.type,
    description: 'Dados de entrada da operação.',
  });
};
