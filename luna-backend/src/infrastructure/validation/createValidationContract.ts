import { ISchema } from 'yup';
import { getSchemaField } from './yup/getSchemaField';

export type IValidationContract<
  Opts = void,
  Schema extends ISchema<any, any> = ISchema<any, any>,
> = (options?: Opts) => Schema;

export const createValidationContract = <
  Opts = void,
  Schema extends ISchema<any, any> = ISchema<any, any>,
>(
  factory: IValidationContract<Opts, Schema>,
) => factory;

export const createValidationContractPickField = <RootOpts>(
  rootValidationContract: IValidationContract<RootOpts>,
  field: string,
  rootOpts?: RootOpts,
) =>
  createValidationContract(() => {
    const schema = rootValidationContract(rootOpts);
    return getSchemaField(schema, field);
  });
