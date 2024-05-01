import { Injectable, PipeTransform } from '@nestjs/common';
import omit from 'lodash/omit';
import type { ISchema } from 'yup';
import * as yup from 'yup';
import { tryCast } from './tryCast';
import { ValidationFailedException } from '../../nest-app/adapters';

interface ValidationPipeYupOptions {
  scope: 'body' | 'param' | 'query' | 'arg';
  path: string | null;
}

@Injectable()
export class ValidationPipeYup implements PipeTransform {
  constructor(
    private yupSchema: ISchema<any, any>,
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
