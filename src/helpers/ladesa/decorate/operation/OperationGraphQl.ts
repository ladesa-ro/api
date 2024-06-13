import { Args as GqlArgs, Mutation as GqlMutation, Query as GqlQuery } from '@nestjs/graphql';
import { camelCase } from 'lodash';
import { InputCombinerGraphQl } from './IntegrationGraphQl/InputCombinerGraphQl';
import { AbstractOperationDecoratorsHandler, BuildGraphQlRepresentation, DecorateMethodContext, detectStrategy } from './utils';

export class OperationDecoratorsHandlerGraphQl extends AbstractOperationDecoratorsHandler {
  Build(context: DecorateMethodContext) {
    this.HandleOutput(context);
    this.HandleInputs(context);
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

    const typeFn = SuccessDto?.type;

    if (!typeFn) {
      return;
    }

    switch (operation.meta?.gql?.kind) {
      case 'query': {
        context.Add(
          GqlQuery(typeFn, {
            nullable: SuccessDto.nullable,
            name: camelCase(operation.name),
            description: operation.description,
          }),
        );

        break;
      }

      case 'mutation': {
        context.Add(
          GqlMutation(typeFn, {
            nullable: SuccessDto.nullable,
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

  HandleInputs(context: DecorateMethodContext) {
    const { operation } = context;

    const graphQlRepresentation = InputCombinerGraphQl.CombinedRepresentation(operation);

    const typeFn = graphQlRepresentation?.type;

    if (typeFn) {
      context.CombinedInputAdd(GqlArgs({ type: typeFn }));
    }
  }
}
