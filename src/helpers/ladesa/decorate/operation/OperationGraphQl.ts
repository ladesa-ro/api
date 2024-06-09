import { Mutation as GqlMutation, Query as GqlQuery } from '@nestjs/graphql';
import { camelCase } from 'lodash';
import { AbstractOperationDecoratorsHandler, BuildDtoCtor, DecorateMethodContext, detectStrategy } from './utils';

export class OperationDecoratorsHandlerGraphQl extends AbstractOperationDecoratorsHandler {
  HandleOutput(context: DecorateMethodContext) {
    const { operation, repository } = context;

    const output = operation.output;
    const outputSuccess = output?.success;
    const outputSuccessTarget = outputSuccess ? repository.GetRealTarget(outputSuccess) : null;

    if (output) {
      switch (detectStrategy(outputSuccessTarget)) {
        case 'dto': {
          const SuccessDto = outputSuccessTarget && BuildDtoCtor(outputSuccessTarget, { mode: 'output' });

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

          break;
        }

        default: {
          break;
        }
      }
    }
  }

  Build(context: DecorateMethodContext) {
    this.HandleOutput(context);
  }
}
