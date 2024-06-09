import { SetMetadata, applyDecorators } from '@nestjs/common';
import { CheckOperation } from '@unispec/ast-builder';
import { IUniNodeOperation } from '@unispec/ast-types';
import type { UniRepository } from '@unispec/ast-utils';
import { getLadesaNodesRepository } from '../../providers';
import { OperationDecoratorsHandlerGraphQl } from './OperationGraphQl';
import { OperationDecoratorsHandlerSwagger } from './OperationSwagger';
import { OperationDecoratorsBuilder } from './utils';

export const OPERATION_KEY = 'operacao4';

export const BuildOperationDecorators = (operation: IUniNodeOperation, repository: UniRepository) => {
  const operationDecoratorsBuilder = new OperationDecoratorsBuilder([
    //
    new OperationDecoratorsHandlerSwagger(),
    new OperationDecoratorsHandlerGraphQl(),
  ]);

  return operationDecoratorsBuilder.Build(operation, repository);
};

export const Operation = (token: string) => {
  const repository = getLadesaNodesRepository();

  const operation = repository.FindByName(token);

  if (!CheckOperation(operation)) {
    throw new Error(`Operation not found: ${token}.`);
  }

  const decorators: MethodDecorator[] = [];

  decorators.push(SetMetadata(OPERATION_KEY, operation));
  decorators.push(...BuildOperationDecorators(operation, repository));

  return applyDecorators(...decorators);
};
