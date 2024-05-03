import { GetDeclarationValidator, GetSchema, IOperation } from '@sisgea/spec';
import * as yup from 'yup';
import { CastDeclarator } from '../../especificacao/utilitarios/SpecHelpers';
import { GqlArgYup } from '../../nest-app';

export const GqlDtoInput = (operation: IOperation) => {
  const input = operation.input;

  switch (input?.strategy) {
    case 'file': {
      throw new TypeError(`GqlDtoInput: operation.input.strategy "${input.strategy}" not supported yet.`);
    }

    case 'dto': {
      const inputBody = input.body;

      if (!inputBody) {
        throw new TypeError('GqlDtoInput: operation.input.body must be set.');
      }

      const declarator = CastDeclarator(`${operation}InputBody`, inputBody);

      if (!declarator) {
        throw new TypeError('GqlDtoInput: operation.input.body: declarator must be valid.');
      }

      const schema = GetSchema(GetDeclarationValidator(declarator()), yup) as yup.ObjectSchema<any>;

      return GqlArgYup('dto', schema, {
        nullable: false,
        // TODO: type: inputDtoType,
        description: 'Dados de entrada da operação.',
      });
    }

    default: {
      throw new TypeError(`GqlDtoInput: You must provide a valid operation.input.strategy`);
    }
  }
};
