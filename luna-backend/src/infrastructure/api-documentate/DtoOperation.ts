import { applyDecorators } from '@nestjs/common';
import { Query, QueryOptions, ReturnTypeFunc } from '@nestjs/graphql';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiResponseMetadata,
} from '@nestjs/swagger';

// ==============================================================

export interface IDtoOperationOptions {
  description: string;

  gql: {
    name: string;
    type: ReturnTypeFunc;
  } & Omit<QueryOptions, 'description' | 'name'>;

  swagger: {
    type: ApiResponseMetadata['type'];
  };
}

export const createDtoOperationOptions = <Opts extends IDtoOperationOptions>(
  options: Opts,
) => options;

// ==============================================================

export const DtoOperationFindAll = (options: IDtoOperationOptions) => {
  return applyDecorators(
    ApiBearerAuth(),
    ApiResponse({
      status: 200,

      type: options.swagger.type,

      description:
        options.description ?? 'Lista os recursos cadastrados no sistema.',
    }),
  );
};

// ==============================================================

export const DtoOperationFindOne = (options: IDtoOperationOptions) => {
  return applyDecorators(
    ApiBearerAuth(),

    ApiResponse({
      status: 200,
      type: options.swagger.type,
      description: options.description ?? 'Retorna a consulta a um registro.',
    }),

    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),
  );
};

// ==============================================================

export const DtoOperationGql = (options: IDtoOperationOptions) => {
  return Query(options.gql.type, {
    name: options.gql.name,
    description: options.description,
  });
};

// ==============================================================
