import { Param } from '@nestjs/common';
import { ISchema } from 'yup';
import { ValidationPipeYup } from '../../../validation/yup/ValidationPipeYup';

export const HttpParamYup = (
  property: string,
  yupSchema: ISchema<any, any>,
) => {
  return Param(
    property,
    new ValidationPipeYup(yupSchema, { scope: 'param', path: property }),
  );
};
