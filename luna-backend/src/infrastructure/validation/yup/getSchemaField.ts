import { Get } from 'type-fest';
import { InferType, ISchema, isSchema, reach } from 'yup';

export const getSchemaField = <P extends string, S extends ISchema<any>>(
  schema: S,
  path: P,
  value?: any,
  context?: any,
): ISchema<Get<InferType<S>, P>, S['__context']> => {
  const subSchema = reach<P, S>(schema, path, value, context);

  if (isSchema(subSchema)) {
    return subSchema;
  }

  throw new TypeError();
};
