import { NodeBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { NodeType } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeType";
import * as valibot from "valibot";

export const Node = valibot.union([NodeType, NodeBase]);

export type Node = typeof Node;

export type INode = valibot.InferOutput<Node>;
