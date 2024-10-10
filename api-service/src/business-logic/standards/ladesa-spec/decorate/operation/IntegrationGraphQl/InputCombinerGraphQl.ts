import { BuildTypeObject, BuildTypeReference, BuildView, CheckType, CheckView } from "@unispec/ast-builder";
import { IUniNodeOperation, IUniNodeType } from "@unispec/ast-types";
import * as ChangeCase from "change-case";
import { BuildGraphQlRepresentation } from "../utils";

export class InputCombinerGraphQl {
  static CombinedView(operation: IUniNodeOperation) {
    const input = operation.input;

    if (!input) {
      return;
    }

    const combinedProperties: Record<string, IUniNodeType> = {};

    if (input.params) {
      for (const [key, node] of Object.entries(input.params)) {
        const projectedKey = ChangeCase.camelCase(key);
        combinedProperties[projectedKey] = node;
      }
    }

    if (input.queries) {
      for (const [key, node] of Object.entries(input.queries)) {
        const projectedKey = ChangeCase.camelCase(key);
        combinedProperties[projectedKey] = node;
      }
    }

    const inputBody = input.body;

    if (inputBody) {
      let inputBodyType: IUniNodeType | null = null;

      if (typeof inputBody === "string") {
        inputBodyType = BuildTypeReference({ targetsTo: inputBody });
      }

      if (CheckView(inputBody)) {
        inputBodyType = BuildTypeReference({ targetsTo: inputBody.name });
      }

      if (CheckType(inputBody)) {
        inputBodyType = inputBody;
      }

      if (inputBodyType) {
        combinedProperties.dto = inputBodyType;
      }
    }

    const operationCombinedGraphQlInput = BuildView({
      name: `${operation.name}CombinedInputs`,
      type: BuildTypeObject({
        properties: combinedProperties,
      }),
    });

    return operationCombinedGraphQlInput;
  }
  static CombinedRepresentation(operation: IUniNodeOperation) {
    const operationCombinedGraphQlInput = this.CombinedView(operation);

    if (operationCombinedGraphQlInput) {
      const graphQlRepresentation = BuildGraphQlRepresentation(operationCombinedGraphQlInput, {
        mode: "input",
        gqlStrategy: "args-type",
      });

      return graphQlRepresentation;
    }

    return null;
  }

  static DecombineInput(operation: IUniNodeOperation, inputData: any) {
    const operationInput = operation.input;

    if (!operationInput || !inputData) {
      return null;
    }

    const decombined: any = {
      params: {},
      queries: {},
      body: undefined,
    };

    if (operationInput.params) {
      for (const [key] of Object.entries(operationInput.params)) {
        const projectedKey = ChangeCase.camelCase(key);

        if (projectedKey in inputData) {
          decombined.params[key] = inputData[key];
        }
      }
    }

    if (operationInput.queries) {
      for (const [key] of Object.entries(operationInput.queries)) {
        const projectedKey = ChangeCase.camelCase(key);

        if (projectedKey in inputData) {
          decombined.queries[key] = inputData[key];
        }
      }
    }

    if (operationInput.body) {
      decombined.body = inputData.dto;
    }

    return decombined;
  }
}
