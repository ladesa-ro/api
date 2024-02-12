import { Param } from '@nestjs/common';
import { ISchema } from 'yup';
import {
  IValidationContract,
  ValidationPipeYup,
  getSchemaSubpath,
} from '../../../validation';

export const HttpParamYup = (
  property: string,
  rootSchema: ISchema<any, any>,
  schemaProperty: string | null = null,
) => {
  return Param(
    property,
    new ValidationPipeYup(getSchemaSubpath(rootSchema, schemaProperty), {
      scope: 'param',
      path: property,
    }),
  );
};

export const HttpParam = (
  property: string,
  validationContract: IValidationContract<any>,
) => {
  const schema = validationContract();

  return Param(
    property,
    new ValidationPipeYup(schema, {
      scope: 'param',
      path: property,
    }),
  );
};
