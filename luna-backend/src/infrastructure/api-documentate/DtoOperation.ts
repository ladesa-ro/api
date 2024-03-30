import { Type, UseInterceptors, applyDecorators } from '@nestjs/common';
import { Mutation, Query, QueryOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiProduces, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { castArray, has } from 'lodash';
import { Schema } from 'yup';
import { IValidationContract } from '../validation';

// ==============================================================

export type IDtoOperationSwaggerType =
  | Type<unknown>
  | any
  | [any]
  | string
  | {
      schema: SchemaObject & Partial<ReferenceObject>;
    };

const isTypeSchema = (
  value: unknown,
): value is {
  schema: SchemaObject & Partial<ReferenceObject>;
} => {
  return has(value, 'schema');
};

const responseDeclarationFromDtoOperationSwaggerType = (returnType: IDtoOperationSwaggerType) => {
  if (isTypeSchema(returnType)) {
    return {
      schema: returnType.schema,
    };
  }

  return {
    type: returnType,
  };
};

export type IDtoOperationGqlType = ReturnTypeFunc;

type IMetaGetFile = {
  mimeType: string | string[];
};

type IMeta = {
  getFile?: IMetaGetFile;
};

export interface IDtoOperationOptions {
  description: string;

  meta?: IMeta;

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

export const createDtoOperationGetFileOptions = (options: Omit<IDtoOperationOptions, 'gql' | 'swagger'> & { swagger: Omit<IDtoOperationOptions['swagger'], 'returnType'> }) =>
  createDtoOperationOptions({
    ...options,
    gql: null,
    swagger: {
      returnType: {
        schema: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
      ...options.swagger,
    },
  });

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
      ...responseDeclarationFromDtoOperationSwaggerType(options.swagger.returnType),
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
      ...responseDeclarationFromDtoOperationSwaggerType(options.swagger.returnType),
      description: options.description ?? 'Retorna a consulta a um registro.',
    }),

    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),
  );
};

// ==============================================================

export const DtoOperationGetFile = (options: IDtoOperationOptions) => {
  const getFile = options.meta?.getFile;

  if (!getFile) {
    throw new TypeError('Provide options.meta.getFile');
  }

  return applyDecorators(
    DtoOperationCommon(options),

    ApiProduces(...castArray(getFile.mimeType)),

    ApiResponse({
      status: 200,
      ...responseDeclarationFromDtoOperationSwaggerType(options.swagger.returnType),
      description: options.description ?? 'Retorna a consulta a um registro.',
    }),

    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),
  );
};

export const DtoOperationSaveFile = (options: IDtoOperationOptions) => {
  return applyDecorators(
    DtoOperationCommon(options),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: ['file'],
        properties: {
          file: {
            type: 'string',
            format: 'binary',
            nullable: false,
          },
        },
      },
    }),
    UseInterceptors(
      FileInterceptor('file', {
        limits: {
          files: 1,
          fileSize: 10 * 1024 * 1024,
        },
      }),
    ),
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
      ...responseDeclarationFromDtoOperationSwaggerType(options.swagger.returnType),
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
      ...responseDeclarationFromDtoOperationSwaggerType(options.swagger.returnType),
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
      ...responseDeclarationFromDtoOperationSwaggerType(options.swagger.returnType),
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
