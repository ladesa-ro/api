import { Args } from '@nestjs/graphql';
import { GetDeclarationValidator, GetSchema, IDeclaration, IOperation } from '@sisgea/spec';
import { pascalCase } from 'change-case';
import * as yup from 'yup';
import { ValidationPipeYup } from '../../validacao';
import { CreateEntityDtoClass } from '../utilitarios';
import { CastDeclarator } from '../utilitarios/SpecHelpers';

export const DadosEntrada = (operation: IOperation, ctx: 'graphql' = 'graphql') => {
  const input = operation.input;

  switch (input?.strategy) {
    case 'file': {
      throw new TypeError(`DadosEntrada: operation.input.strategy "${input.strategy}" not supported yet.`);
    }

    case 'dto': {
      const inputBody = input.body;
      const inputBodyDeclarator = CastDeclarator(`${operation}InputBody`, inputBody);

      const inputParams = input.params;
      const inputParamsDeclarator = CastDeclarator(`${operation}InputParams`, inputParams);

      const declarator = () => {
        return {
          name: `${pascalCase(operation.name)}CombinedInput`,
          properties: {
            ...inputBodyDeclarator?.().properties,
            ...inputParamsDeclarator?.().properties,
          },
        } satisfies IDeclaration;
      };

      const declaration = declarator();

      const declarationValidator = GetDeclarationValidator(declaration);

      const DtoClass = CreateEntityDtoClass(() => declaration, 'input', undefined, undefined, 'args-type');

      const schema = GetSchema(declarationValidator, yup) as yup.ObjectSchema<any>;

      switch (ctx) {
        case 'graphql': {
          return Args({ type: () => DtoClass }, new ValidationPipeYup(schema, { scope: 'args', path: null }));
        }

        default: {
          throw new TypeError(`DadosEntrada: Unsupported context: ${ctx}.`);
        }
      }
    }

    default: {
      throw new TypeError(`DadosEntrada: You must provide a valid operation.input.strategy.`);
    }
  }
};
