import { Body } from '@nestjs/common';
import { Schema } from 'yup';
import { ValidationPipeYup } from '../../../validation/yup/ValidationPipeYup';

export const HttpBodyYup = (property: string, yupSchema: Schema<any, any>) => {
  return Body(
    property,
    new ValidationPipeYup(yupSchema, { scope: 'body', path: property }),
  );
};
