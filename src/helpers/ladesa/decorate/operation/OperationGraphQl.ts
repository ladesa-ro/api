import { Mutation as GqlMutation, Query as GqlQuery } from '@nestjs/graphql';
import { camelCase } from 'lodash';
import { AbstractOperationDecoratorsHandler, BuildGraphQlRepresentation, DecorateMethodContext, detectStrategy } from './utils';

export class OperationDecoratorsHandlerGraphQl extends AbstractOperationDecoratorsHandler {
  Build(context: DecorateMethodContext) {
    this.HandleOutput(context);
  }

  HandleOutput(context: DecorateMethodContext) {
    const { operation, repository } = context;

    const output = operation.output;
    const outputSuccess = output?.success;
    const outputSuccessTarget = outputSuccess ? repository.GetRealTarget(outputSuccess) : null;

    if (output) {
      switch (detectStrategy(outputSuccessTarget)) {
        case 'dto': {
          this.HandleOutputDto(context);
          break;
        }

        default: {
          break;
        }
      }
    }
  }

  HandleOutputDto(context: DecorateMethodContext) {
    const { operation, repository } = context;

    const output = operation.output;
    const outputSuccess = output?.success;
    const outputSuccessTarget = outputSuccess ? repository.GetRealTarget(outputSuccess) : null;

    const SuccessDto = outputSuccessTarget && BuildGraphQlRepresentation(outputSuccessTarget, { mode: 'output' });

    if (!SuccessDto) {
      return;
    }

    switch (operation.meta?.gql?.kind) {
      case 'query': {
        context.Add(
          GqlQuery(() => SuccessDto, {
            name: camelCase(operation.name),
            description: operation.description,
          }),
        );

        break;
      }

      case 'mutation': {
        context.Add(
          GqlMutation(() => SuccessDto, {
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
}
