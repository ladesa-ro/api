import {
  CheckType,
  INode,
  INodeTypeObjectEntity,
  INodeTypeObjectOperation,
  Node,
  NodeRef,
  NodeTypeObjectEntity,
  NodeTypeObjectOperation,
} from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas";
import defu from "defu";

const strict = false;

export class NodesStore {
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

  GetTargetNode(token: INode | string) {
    const store = this;

    const nestedNodes: INode[] = [];

    let nextCursor: INode | string | null = token;

    do {
      if (CheckType(Node, nextCursor)) {
        if (CheckType(NodeRef, nextCursor)) {
          nestedNodes.push(nextCursor);
        } else {
          nestedNodes.push(nextCursor);
        }
      }

      let targetId: string | null = null;

      if (typeof nextCursor === "string") {
        targetId = nextCursor;
      } else if (CheckType(NodeRef, nextCursor)) {
        targetId = nextCursor.$ref;
      }

      if (targetId !== null) {
        const targetNode = store.GetNodeWithId(targetId);
        nextCursor = targetNode;
        continue;
      }

      nextCursor = null;
    } while (nextCursor !== null);

    const finalNode = defu<INode, INode[]>({}, ...nestedNodes);

    delete finalNode.$ref;

    return finalNode;
  }
}

export const especificacaoNodesStore = new NodesStore();
