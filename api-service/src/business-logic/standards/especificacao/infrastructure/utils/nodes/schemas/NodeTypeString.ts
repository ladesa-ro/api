import { NodeBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import * as valibot from "valibot";

export const NodeTypeString = valibot.object({
  ...NodeBase.entries,
  type: valibot.literal("string"),
  format: valibot.optional(valibot.string()),
});

export type NodeTypeString = typeof NodeTypeString;

export type INodeTypeString = valibot.InferOutput<NodeTypeString>;
