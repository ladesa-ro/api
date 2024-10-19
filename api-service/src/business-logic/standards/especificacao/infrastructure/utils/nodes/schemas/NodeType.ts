import { NodeTypeObject } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObject";
import * as valibot from "valibot";

export const NodeType = valibot.variant("type", [NodeTypeObject]);

export type NodeType = typeof NodeType;

export type INodeType = valibot.InferOutput<NodeType>;
