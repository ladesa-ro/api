import { Type, applyDecorators } from '@nestjs/common';
import { Mutation, Query, QueryOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ApiBearerAuth, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Schema } from 'yup';
import { IValidationContract } from '../validation';

// ==============================================================

export type IDtoOperationSwaggerType = Type<unknown> | any | [any] | string;
export type IDtoOperationGqlType = ReturnTypeFunc;

export interface IDtoOperationOptions {
  description: string;

  gql: Omit<QueryOptions, 'description' | 'name' | 'type'> & {
    name: string;
    returnType: ReturnTypeFunc;

    inputDtoType?: ReturnTypeFunc;
    inputDtoValidationContract?: IValidationContract<any, Schema>;
  };

  swagger: {
    returnType: IDtoOperationSwaggerType;

    inputBodyType?: IDtoOperationSwaggerType;
    inputBodyValidationContract?: IValidationContract<any, Schema>;

    params?: {
      name: string;
      description: string;
      validationContract: IValidationContract;
    }[];
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
        description: param.description,
      }),
    ),
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
  return Query(options.gql.returnType, {
    name: options.gql.name,
    description: options.description,
  });
};

export const DtoOperationGqlMutation = (options: IDtoOperationOptions) => {
  return Mutation(options.gql.returnType, {
    name: options.gql.name,
    description: options.description,
  });
};

// ==============================================================
