import { Type, applyDecorators } from '@nestjs/common';
import { Mutation, Query, QueryOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Schema } from 'yup';
import { IValidationContract } from '../validation';

// ==============================================================

export type IDtoOperationSwaggerType = Type<unknown> | any | [any] | string;

export type IDtoOperationGqlType = ReturnTypeFunc;

export interface IDtoOperationOptions {
  description: string;

  gql:
    | null
    | (Omit<QueryOptions, 'description' | 'name' | 'type'> & {
        name: string;
        returnType: ReturnTypeFunc;

        inputNullable?: boolean;
        inputDtoType?: ReturnTypeFunc;
        inputDtoValidationContract?: IValidationContract<any, Schema>;
      });

  swagger: {
    returnType: IDtoOperationSwaggerType;

    inputBodyType?: IDtoOperationSwaggerType;
    inputBodyValidationContract?: IValidationContract<any, Schema>;

    params?: {
      name: string;
      description: string;
      validationContract: IValidationContract;
      required?: boolean;
    }[];

    queries?: (
      | string
      | {
          name: string;
          description: string;
          validationContract: IValidationContract;
          required?: boolean;
        }
    )[];
  };
}

export const createDtoOperationOptions = (options: IDtoOperationOptions) => options;

// ==============================================================

export const DtoOperationCommon = (options: IDtoOperationOptions) => {
  return applyDecorators(
    ApiBearerAuth(),

    ApiResponse({
      status: 403,
      description: 'O solicitante não tem permissão para executar esta ação.',
    }),

    ...(options.swagger.params ?? []).map((param) =>
      ApiParam({
        name: param.name,
        required: param.required,
        description: param.description,
      }),
    ),

    ...(options.swagger.queries ?? []).map((query) => {
      if (typeof query === 'string') {
        return ApiQuery({
          name: query,
          type: 'string',
          required: false,
        });
      } else {
        return ApiQuery({
          name: query.name,
          required: query.required,
          description: query.description,
        });
      }
    }),
  );
};

export const DtoOperationFindAll = (options: IDtoOperationOptions) => {
  return applyDecorators(
    DtoOperationCommon(options),

    ApiResponse({
      status: 200,
      type: options.swagger.returnType,
      description: options.description ?? 'Lista os recursos cadastrados no sistema.',
    }),
  );
};

// ==============================================================

export const DtoOperationFindOne = (options: IDtoOperationOptions) => {
  return applyDecorators(
    DtoOperationCommon(options),

    ApiResponse({
      status: 200,
      type: options.swagger.returnType,
      description: options.description ?? 'Retorna a consulta a um registro.',
    }),

    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),
  );
};

// ==============================================================

export const DtoOperationCreate = (options: IDtoOperationOptions) => {
  if (!options.swagger.inputBodyType) {
    throw new TypeError('Please provide options.swagger.inputBodyType');
  }

  return applyDecorators(
    DtoOperationCommon(options),

    ApiResponse({
      status: 200,
      type: options.swagger.returnType,
      description: options.description ?? 'Retorna o registro cadastrado.',
    }),

    ApiBody({
      type: options.swagger.inputBodyType,
    }),
  );
};

// ==============================================================

export const DtoOperationUpdate = (options: IDtoOperationOptions) => {
  if (!options.swagger.inputBodyType) {
    throw new TypeError('Please provide options.swagger.inputBodyType');
  }

  return applyDecorators(
    DtoOperationCommon(options),

    ApiResponse({
      status: 200,
      type: options.swagger.returnType,
      description: options.description ?? 'Retorna o registro cadastrado.',
    }),

    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),

    ApiBody({
      type: options.swagger.inputBodyType,
    }),
  );
};

// ==============================================================

export const DtoOperationDelete = (options: IDtoOperationOptions) => {
  return applyDecorators(
    DtoOperationCommon(options),

    ApiResponse({
      status: 200,
      type: options.swagger.returnType,
      description: options.description ?? 'Registro marcado como apagado.',
    }),

    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),
  );
};
// ==============================================================

export const DtoOperationGqlQuery = (options: IDtoOperationOptions) => {
  if (!options.gql) {
    throw new TypeError('Provide options.gql');
  }

  return Query(options.gql.returnType, {
    name: options.gql.name,
    description: options.description,
  });
};

export const DtoOperationGqlMutation = (options: IDtoOperationOptions) => {
  if (!options.gql) {
    throw new TypeError('Provide options.gql');
  }

  return Mutation(options.gql.returnType, {
    name: options.gql.name,
    description: options.description,
  });
};

// ==============================================================
