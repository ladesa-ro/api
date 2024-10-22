import { ISpecNodesStore } from "@/business-logic/standards/especificacao/business-logic/SpecNodesStore/Types/ISpecNodesStore";
import {
  CheckType,
  INode,
  INodeTypeObjectEntity,
  INodeTypeObjectOperation,
  NodeTypeObjectEntity,
  NodeTypeObjectOperation,
} from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas";

const strict = false;

export class SpecNodesStoreFromNpmPackage implements ISpecNodesStore {
  #mapNodes = new Map<string, INode>();
  #mapEntities = new Map<string, INodeTypeObjectEntity>();
  #mapOperations = new Map<string, INodeTypeObjectOperation>();

  get Nodes() {
    return this.FetchNodesSync();
  }

  *FetchNodesSync() {
    const especificacao = require("@ladesa-ro/especificacao-latest");

    for (const node of especificacao.Nodes) {
      yield node;
    }
  }

  GetNodeWithId(name: string): INode {
    if (this.#mapNodes.has(name)) {
      const mappedNode = this.#mapNodes.get(name);
      return mappedNode!;
    }

    for (const node of this.Nodes) {
      if ((!strict || CheckType(NodeTypeObjectEntity, node)) && node["$id"] === name) {
        this.#mapNodes.set(name, node);
        return node;
      }
    }

    throw new Error(`node not found: ${name}`);
  }

  GetEntityNode(name: string) {
    if (this.#mapEntities.has(name)) {
      const mappedNode = this.#mapEntities.get(name);
      return mappedNode!;
    }

    for (const node of this.Nodes) {
      if ((!strict || CheckType(NodeTypeObjectEntity, node)) && node["x-unispec-entity-id"] === name) {
        this.#mapEntities.set(name, node);
        return node;
      }
    }

    throw new Error(`entity not found: ${name}`);
  }

  GetOperationNode(name: string): INodeTypeObjectOperation {
    if (this.#mapOperations.has(name)) {
      const mappedNode = this.#mapOperations.get(name);
      return mappedNode!;
    }

    for (const node of this.Nodes) {
      if ((!strict || CheckType(NodeTypeObjectOperation, node)) && node["x-unispec-operation-id"] === name) {
        this.#mapOperations.set(name, node);
        return node;
      }
    }

    throw new Error(`operation not found: ${name}`);
  }
}
