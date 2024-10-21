import { NodeBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { BuildCheckType } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export const NodeTypeNull = valibot.object({
  ...NodeBase.entries,
  type: valibot.literal("null"),
});

export type NodeTypeNull = typeof NodeTypeNull;

export type INodeTypeNull = valibot.InferOutput<NodeTypeNull>;

export const CheckNodeTypeNull = BuildCheckType(NodeTypeNull);
