import { inspect } from "util";
import { IDtoCompilerContext } from "@/business-logic/standards/especificacao/business-logic/DtoCompiler/typings";
import { CheckNodeTypeNull, INode, INodeTypeArray, INodeTypeObjectEntity, NodeHandler } from "@/business-logic/standards/especificacao/infrastructure";
import { ApiResponseMetadata } from "@nestjs/swagger";
import { SchemaObjectMetadata } from "@nestjs/swagger/dist/interfaces/schema-object-metadata.interface";
import defu from "defu";
import { isEqual } from "lodash";
import { T } from "vitest/dist/chunks/environment.CzISCQ7o";

export type ISwaggerType = SchemaObjectMetadata | ApiResponseMetadata;

export type IDecomposedNodeStep = Partial<ISwaggerType> & {
  nullable?: boolean;
  $ref?: string;
  anyOf?: any;
};

const deduplicateSchemaNodes = (nodes: T[]) => {
  return nodes.filter((node, nodeIndex) => {
    return nodes.findIndex((checkNode) => isEqual(checkNode, node)) === nodeIndex;
  });
};

export class SwaggerNodeCompiler extends NodeHandler<ISwaggerType, IDtoCompilerContext> {
  DecomposeNode(node: INode, context: IDtoCompilerContext) {
    const decomposedNodeSteps: IDecomposedNodeStep[] = [];

    decomposedNodeSteps.push({
      ...node,
    });

    if (node.$ref) {
      const targetNode = context.nodesStore.GetNodeWithId(node.$ref);
      decomposedNodeSteps.push(this.Handle(targetNode, context));
    }

    const anyOf = node.anyOf ? deduplicateSchemaNodes(node.anyOf) : null;

    if (anyOf && anyOf.length > 0) {
      if (anyOf.length === 1) {
        decomposedNodeSteps.push(this.DecomposeNode(anyOf[0], context));
      } else if (anyOf.length === 2 && anyOf.some(CheckNodeTypeNull)) {
        const otherNodes = anyOf.filter((node) => !CheckNodeTypeNull(node));

        const otherNodesDecomposed = otherNodes.map((node) => this.DecomposeNode(node, context));

        for (const otherNodeDecomposed of otherNodesDecomposed) {
          decomposedNodeSteps.push({
            ...otherNodeDecomposed,
            nullable: true,
          });
        }
      } else {
        console.debug(inspect(node, { depth: Infinity }));
        throw new TypeError(`${SwaggerNodeCompiler.name}#${this.DecomposeNode.name}: could not handle anyOf`);
      }
    }

    const decomposeNodeResult = defu<IDecomposedNodeStep, IDecomposedNodeStep[]>({}, ...decomposedNodeSteps);

    decomposeNodeResult.$ref = undefined;
    decomposeNodeResult.anyOf = undefined;

    return decomposeNodeResult;
  }

  HandleTypeObjectEntity(node: INodeTypeObjectEntity, context: IDtoCompilerContext) {
    const decomposed = this.DecomposeNode(node, context);

    const dto = context.dtoCompiler.CompileNode(node);

    return {
      ...decomposed,

      type: dto,

      properties: undefined,
      required: undefined,
      additionalProperties: undefined,
    } satisfies ISwaggerType;
  }

  HandleTypeArray(node: INodeTypeArray, context: IDtoCompilerContext): ISwaggerType {
    return {
      isArray: true,
      ...this.Handle(node.items, context),
    } satisfies ISwaggerType;
  }

  HandleDefault(node: any, context: IDtoCompilerContext): ISwaggerType {
    const decomposed = this.DecomposeNode(node, context);

    return { ...decomposed } satisfies ISwaggerType;
  }

  Handle(node: INode, context: IDtoCompilerContext): ISwaggerType {
    const handled = super.Handle(node, context);

    if (handled) {
      return handled;
    }

    throw new TypeError("could not handle node");
  }
}
