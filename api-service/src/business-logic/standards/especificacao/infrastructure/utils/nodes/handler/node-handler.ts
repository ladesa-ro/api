import {
  CheckType,
  INode,
  INodeRef,
  INodeTypeObject,
  INodeTypeObjectBase,
  INodeTypeObjectEntity,
  INodeTypeObjectOperation,
  NodeRef,
  NodeTypeObject,
  NodeTypeObjectBase,
  NodeTypeObjectEntity,
  NodeTypeObjectOperation,
} from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas";

export class NodeHandler<Context = void> {
  HandleDefault(node: any, context: Context) {
    console.debug("unhandled node:", node);
    throw new Error("unhandled node");
  }

  HandleTypeObjectBase(node: INodeTypeObjectBase, context: Context) {
    return this.HandleDefault(node, context);
  }

  HandleTypeObjectEntity(node: INodeTypeObjectEntity, context: Context) {
    return this.HandleDefault(node, context);
  }

  HandleTypeObjectOperation(node: INodeTypeObjectOperation, context: Context) {
    return this.HandleDefault(node, context);
  }

  HandleTypeObject(node: INodeTypeObject, context: Context) {
    if (CheckType(NodeTypeObjectOperation, node)) {
      return this.HandleTypeObjectOperation(node, context);
    }

    if (CheckType(NodeTypeObjectEntity, node)) {
      return this.HandleTypeObjectEntity(node, context);
    }

    if (CheckType(NodeTypeObjectBase, node)) {
      return this.HandleTypeObjectBase(node, context);
    }

    return this.HandleDefault(node, context);
  }

  HandleRef(node: INodeRef, context: Context) {
    return this.HandleDefault(node, context);
  }

  Handle(node: INode, context: Context) {
    if (CheckType(NodeRef, node)) {
      return this.HandleRef(node, context);
    }

    if (CheckType(NodeTypeObject, node)) {
      return this.HandleTypeObject(node, context);
    }

    return this.HandleDefault(node, context);
  }
}
