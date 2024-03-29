import { Injectable, PipeTransform } from '@nestjs/common';
import omit from 'lodash/omit';
import * as yup from 'yup';
import { ValidationFailedException } from '../../adapters/common/ValidationFailedException';
import { tryCast } from './tryCast';

interface ValidationPipeYupOptions {
  scope: 'body' | 'param' | 'query' | 'arg';
  path: string | null;
}

@Injectable()
export class ValidationPipeYup implements PipeTransform {
  constructor(
    private yupSchema: yup.ISchema<any, any>,
    private options: ValidationPipeYupOptions,
  ) {}

  async transform(value: any /*, metadata: ArgumentMetadata */) {
    try {
      const data = await this.yupSchema.validate(tryCast(this.yupSchema, value));
      return data;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        throw new ValidationFailedException([
          {
            scope: this.options.scope,
            ...omit(err, ['params', 'value', 'inner']),
            path: [this.options.path, err.path].filter(Boolean).join('.'),
          },
        ]);
      }
    }
  }
}
