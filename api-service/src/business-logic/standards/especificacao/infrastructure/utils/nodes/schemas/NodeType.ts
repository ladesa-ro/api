import { NodeTypeArray } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeArray";
import { NodeTypeBoolean } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeBoolean";
import { NodeTypeNull } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeNull";
import { NodeTypeObject } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObject";
import { NodeTypeString } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeString";
import * as valibot from "valibot";

export const NodeType = valibot.variant("type", [NodeTypeArray, NodeTypeBoolean, NodeTypeString, NodeTypeNull, NodeTypeObject]);

export type NodeType = typeof NodeType;

export type INodeType = valibot.InferOutput<NodeType>;
