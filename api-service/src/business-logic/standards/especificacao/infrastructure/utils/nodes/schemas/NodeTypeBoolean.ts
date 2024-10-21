import { NodeBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { BuildCheckType } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export const NodeTypeBoolean = valibot.object({
  ...NodeBase.entries,
  type: valibot.literal("boolean"),
});

export type NodeTypeBoolean = typeof NodeTypeBoolean;

export type INodeTypeBoolean = valibot.InferOutput<NodeTypeBoolean>;

export const CheckNodeTypeBoolean = BuildCheckType(NodeTypeBoolean);
