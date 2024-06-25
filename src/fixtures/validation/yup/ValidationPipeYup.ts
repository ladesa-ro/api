import { Injectable, PipeTransform } from '@nestjs/common';
import { omit } from 'lodash';
import type { ISchema } from 'yup';
import * as yup from 'yup';
import { tryCast } from './tryCast';
import { ValidationFailedException } from '../../../app-standards';

interface ValidationPipeYupOptions {
  scope?: 'body' | 'param' | 'query' | 'arg' | 'args';
  path?: string | null;
}

@Injectable()
export class ValidationPipeYup implements PipeTransform {
  constructor(
    private yupSchema: ISchema<any, any>,
    private options: ValidationPipeYupOptions = {},
  ) {}

  async transform(value: any /*, metadata: ArgumentMetadata */) {
    try {
      const schema = this.yupSchema;

      const casted = tryCast(schema, value);
      const data = await schema.validate(casted);

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
      } else {
        throw new ValidationFailedException([
          {
            scope: this.options.scope,
            path: [this.options.path].filter(Boolean).join('.'),
          },
        ]);
      }
    }
  }
}
