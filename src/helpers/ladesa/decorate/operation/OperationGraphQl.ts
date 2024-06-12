import { Args as GqlArgs, Mutation as GqlMutation, Query as GqlQuery } from '@nestjs/graphql';
import { BuildTypeObject, BuildView, CheckType } from '@unispec/ast-builder';
import { camelCase } from 'lodash';
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
    const { operation, repository } = context;

    const input = operation.input;

    if (!input) {
      return;
    }

    const operationCombinedGraphQlInput = BuildView({
      name: operation.name,
      type: BuildTypeObject({
        properties: {
          ...input.params,
        },
      }),
    });

    const graphQlRepresentation = BuildGraphQlRepresentation(operationCombinedGraphQlInput, { gqlStrategy: 'args-type' });

    const typeFn = graphQlRepresentation.type;

    if (!typeFn) {
      return;
    }

    for (const [key, opaqueTargetNode] of Object.entries(input.params ?? {})) {
      const name = key;

      const realTargetNode = repository.GetRealTarget(opaqueTargetNode);

      if (CheckType(realTargetNode)) {
        context.CombinedInputAdd(GqlArgs({ type: typeFn }));
      } else {
        throw new TypeError(`Invalid param real target: ${name}.`);
      }
    }
  }
}
