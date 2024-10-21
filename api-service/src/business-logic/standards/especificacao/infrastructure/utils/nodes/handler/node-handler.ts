import {
  CheckType,
  INode,
  INodeTypeArray,
  INodeTypeNull,
  INodeTypeObject,
  INodeTypeObjectBase,
  INodeTypeObjectEntity,
  INodeTypeObjectOperation,
  INodeTypeString,
  NodeTypeArray,
  NodeTypeNull,
  NodeTypeObject,
  NodeTypeObjectBase,
  NodeTypeObjectEntity,
  NodeTypeObjectOperation,
  NodeTypeString,
} from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas";

export class NodeHandler<Out = unknown, Context = void> {
  HandleDefault(node: any, context: Context): Out {
    console.debug("unhandled node:", node);
    throw new Error("unhandled node");
  }

  HandleTypeObjectBase(node: INodeTypeObjectBase, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeObjectEntity(node: INodeTypeObjectEntity, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeObjectOperation(node: INodeTypeObjectOperation, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeObject(node: INodeTypeObject, context: Context): Out {
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

  HandleTypeNull(node: INodeTypeNull, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeArray(node: INodeTypeArray, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  HandleTypeString(node: INodeTypeString, context: Context): Out {
    return this.HandleDefault(node, context);
  }

  Handle(node: INode, context: Context): Out {
    if (CheckType(NodeTypeNull, node)) {
      return this.HandleTypeNull(node, context);
    }

    if (CheckType(NodeTypeArray, node)) {
      return this.HandleTypeArray(node, context);
    }

    if (CheckType(NodeTypeString, node)) {
      return this.HandleTypeString(node, context);
    }

    if (CheckType(NodeTypeObject, node)) {
      return this.HandleTypeObject(node, context);
    }

    return this.HandleDefault(node, context);
  }
}
