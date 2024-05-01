import { Args } from '@nestjs/graphql';
import { ArgsOptions } from '@nestjs/graphql/dist/decorators/args.decorator';
import { Schema } from 'yup';
import { ValidationPipeYup } from '../../../../../validacao';

export const GqlArgYup = (property: string, yupSchema: Schema<any, any>, options?: ArgsOptions) => {
  return Args(property, { ...options }, new ValidationPipeYup(yupSchema, { scope: 'arg', path: property }));
};
