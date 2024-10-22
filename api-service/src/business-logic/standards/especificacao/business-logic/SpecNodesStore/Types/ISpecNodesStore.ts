import { INode, INodeTypeObjectEntity, INodeTypeObjectOperation } from "@/business-logic/standards/especificacao/infrastructure";

export interface ISpecNodesStore {
  GetNodeWithId(name: string): INode;
  GetEntityNode(name: string): INodeTypeObjectEntity;
  GetOperationNode(name: string): INodeTypeObjectOperation;
}
