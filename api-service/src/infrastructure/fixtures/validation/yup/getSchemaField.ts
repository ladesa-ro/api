import { Get } from "type-fest";
import { ISchema, InferType, isSchema, reach } from "yup";

export const getSchemaField = <P extends string, S extends ISchema<any>>(schema: S, path: P, value?: any, context?: any): ISchema<Get<InferType<S>, P>, S["__context"]> => {
  const subSchema = reach<P, S>(schema, path, value, context);

  if (isSchema(subSchema)) {
    return subSchema;
  }

  throw new TypeError();
};

export const getSchemaSubpath = <P extends string, S extends ISchema<any>>(schema: S, path: P | null = null) => {
  if (path) {
    return getSchemaField(schema, path);
  }

  return schema;
};
