import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { Mutation, Query } from '@nestjs/graphql';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiProduces, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { IDeclarationPropertyMixed, IDeclarationPropertySimple, IOperation } from '@sisgea/spec';
import { camelCase } from 'lodash';
import { CreateEntityDtoClass } from '../../legacy/utils';
import { CastDeclarator } from '../utilitarios/SpecHelpers';

export const Operacao = (operation: IOperation) => {
  const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [];

  decorators.push(ApiBearerAuth());

  decorators.push(
    ApiResponse({
      status: 403,
      description: 'O solicitante não tem permissão para executar esta ação.',
    }),
  );

  const input = operation.input;

  if (input) {
    switch (input.strategy) {
      case 'file': {
        decorators.push(ApiConsumes('multipart/form-data'));

        decorators.push(
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
        );

        decorators.push(UseInterceptors(FileInterceptor('file' /*saveFile?.localOptions */)));
        break;
      }

      case 'dto': {
        for (const [propertyKey, propertyDeclaration] of Object.entries(input.params ?? {})) {
          let propertyDeclarationSimple: IDeclarationPropertySimple;

          if (propertyDeclaration.type === 'mixed') {
            const propertyDeclarationMixed = propertyDeclaration as IDeclarationPropertyMixed;
            propertyDeclarationSimple = propertyDeclarationMixed.input;
          } else {
            propertyDeclarationSimple = propertyDeclaration as IDeclarationPropertySimple;
          }

          const name = propertyDeclarationSimple.name ?? propertyKey;

          decorators.push(
            ApiParam({
              name: name,
              required: propertyDeclarationSimple.required,
              description: propertyDeclarationSimple.description,
            }),
          );
        }

        for (const [propertyKey, propertyDeclaration] of Object.entries(input.query ?? {})) {
          let propertyDeclarationSimple: IDeclarationPropertySimple;

          if (propertyDeclaration.type === 'mixed') {
            const propertyDeclarationMixed = propertyDeclaration as IDeclarationPropertyMixed;
            propertyDeclarationSimple = propertyDeclarationMixed.input;
          } else {
            propertyDeclarationSimple = propertyDeclaration as IDeclarationPropertySimple;
          }

          const name = propertyDeclarationSimple.name ?? propertyKey;

          decorators.push(
            ApiQuery({
              name: name,
              required: propertyDeclarationSimple.required,
              description: propertyDeclarationSimple.description,
            }),
          );
        }

        const inputBody = input.body;

        const inputBodyDeclarator = CastDeclarator(`${operation}InputBody`, inputBody);

        if (inputBodyDeclarator) {
          decorators.push(
            ApiBody({
              type: CreateEntityDtoClass(inputBodyDeclarator, 'input'),
            }),
          );
        }

        break;
      }

      default: {
        throw new TypeError('Unsupported operation.input.strategy');
      }
    }
  }

  const output = operation.output;

  if (output) {
    switch (output.strategy) {
      case 'file': {
        decorators.push(ApiProduces(...output.mimeTypes));

        decorators.push(
          ApiResponse({
            status: 200,
            schema: {
              type: 'string',
              format: 'binary',
              nullable: false,
            },
            description: output.description,
          }),
        );

        break;
      }

      case 'dto': {
        const results = {
          success: output.success ?? undefined,
        };

        for (const [, resultDeclaration] of Object.entries(results)) {
          const status = 200;

          decorators.push(
            ApiResponse({
              status,
              type: resultDeclaration.dto ? CreateEntityDtoClass(resultDeclaration.dto, 'output') : undefined,
              description: resultDeclaration.description ?? `Sucesso na operação "${operation.description}".`,
            }),
          );
        }

        break;
      }

      default: {
        break;
      }
    }
  }

  if (output && output.strategy === 'dto' && output.success.dto) {
    const SuccessDto = CreateEntityDtoClass(output.success.dto, 'output');

    switch (operation.gql) {
      case 'query': {
        decorators.push(
          Query(() => SuccessDto, {
            name: camelCase(operation.name),
            description: operation.description,
          }),
        );

        break;
      }
      case 'mutation': {
        decorators.push(
          Mutation(() => SuccessDto, {
            name: camelCase(operation.name),
            description: operation.description,
          }),
        );

        break;
      }

      default: {
        break;
      }
    }
  }

  decorators.push(
    ApiResponse({
      status: 404,
      description: 'Registro não encontrado.',
    }),
  );

  return applyDecorators(...decorators);
};
