import { NodeTypeObjectBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObjectBase";
import { NodeTypeObjectEntity } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObjectEntity";
import { NodeTypeObjectOperation } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObjectOperation";
import * as valibot from "valibot";

export const NodeTypeObject = valibot.variant("x-unispec-kind", [NodeTypeObjectBase, NodeTypeObjectEntity, NodeTypeObjectOperation]);

export type NodeTypeObject = typeof NodeTypeObject;

export type INodeTypeObject = valibot.InferOutput<NodeTypeObject>;
