import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Args } from '@nestjs/graphql';
import { GetDeclarationValidator, GetSchema, IDeclaration, IOperation } from '@sisgea/spec';
import { pascalCase } from 'change-case';
import { Request } from 'express';
import * as yup from 'yup';
import { ValidationPipeYup } from '../../validacao';
import { CreateEntityDtoClass } from '../utilitarios';
import { CastDeclarator } from '../utilitarios/SpecHelpers';

export const DadosEntrada = (operation: IOperation, platform: 'graphql' | 'http') => {
  const input = operation.input;

  switch (input?.strategy) {
    case 'file': {
      throw new TypeError(`DadosEntrada: operation.input.strategy "${input.strategy}" not supported yet.`);
    }

    case 'dto': {
      const inputDto = input.dto;

      const combinedDeclarator = () => {
        if (platform === 'graphql' && inputDto) {
          return inputDto();
        }

        const inputBody = input.body;
        const inputBodyDeclarator = CastDeclarator(`${operation}InputBody`, inputBody);

        const inputParams = input.params;
        const inputParamsDeclarator = CastDeclarator(`${operation}InputParams`, inputParams);

        const inputQueries = input.query;
        const inputQueriesDeclarator = CastDeclarator(`${operation}InputQueries`, inputQueries);

        return {
          name: `${pascalCase(operation.name)}CombinedInput`,
          properties: {
            ...inputBodyDeclarator?.().properties,
            ...inputParamsDeclarator?.().properties,
            ...inputQueriesDeclarator?.().properties,
          },
        } satisfies IDeclaration;
      };

      const combinedDeclaration = combinedDeclarator();

      const dtoValidator = GetDeclarationValidator(inputDto ? inputDto() : combinedDeclaration);
      const dtoSchema = GetSchema(dtoValidator, yup) as yup.ObjectSchema<any>;

      const validationPipe = new ValidationPipeYup(dtoSchema, { scope: 'args', path: null });

      switch (platform) {
        case 'graphql': {
          const DtoClass = CreateEntityDtoClass(() => combinedDeclaration, 'input', undefined, undefined, 'args-type');

          return Args({ type: () => DtoClass }, validationPipe);
        }

        case 'http': {
          const BaseDecorator = createParamDecorator((_, executionContext: ExecutionContext) => {
            const request: Request = executionContext.switchToHttp().getRequest();

            const body = request.body;
            const query = request.query;
            const params = request.params;

            const combined = input.combineInputs
              ? input.combineInputs({ params, body, query })
              : {
                  ...params,
                  ...query,
                  ...body,
                };

            return combined;
          });

          return BaseDecorator(null, validationPipe);
        }

        default: {
          break;
        }
      }

      break;
    }

    default: {
      break;
    }
  }
  throw new TypeError(`DadosEntrada: You must provide a valid operation.input.strategy.`);
};

export const DadosEntradaGql = (operation: IOperation): ParameterDecorator => DadosEntrada(operation, 'graphql');

export const DadosEntradaHttp = (operation: IOperation): ParameterDecorator => DadosEntrada(operation, 'http');
