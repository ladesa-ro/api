import { Body as NestHttpBodyPrimitive } from '@nestjs/common';
import { GetDeclarationValidator, GetSchema, IOperation } from '@sisgea/spec';
import * as yup from 'yup';
import { CastDeclarator } from '../../especificacao/utilitarios/SpecHelpers';
import { ValidationPipeYup } from '../../validacao';

export const HttpDtoBody = (operation: IOperation) => {
  const input = operation.input;

  switch (input?.strategy) {
    case 'file': {
      throw new TypeError(`HttpDtoBody: operation.input.strategy "${input.strategy}" not supported yet.`);
    }

    case 'dto': {
      const inputBody = input.body;

      if (!inputBody) {
        throw new TypeError('HttpDtoBody: operation.input.body must be set.');
      }

      const declarator = CastDeclarator(`${operation}InputBody`, inputBody);

      if (!declarator) {
        throw new TypeError('HttpDtoBody: operation.input.body: declarator must be valid.');
      }

      const schema = GetSchema(GetDeclarationValidator(declarator()), yup);

      return NestHttpBodyPrimitive(
        new ValidationPipeYup(schema, {
          scope: 'body',
          path: null,
        }),
      );
    }

    default: {
      throw new TypeError(`HttpDtoBody: You must provide a valid operation.input.strategy`);
    }
  }
};
