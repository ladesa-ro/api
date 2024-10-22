import { NestedNode } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import { NodeBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import { BuildCheckType } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/helpers";
import * as valibot from "valibot";

export const NodeTypeArray = valibot.object({
  ...NodeBase.entries,
  type: valibot.literal("array"),
  items: valibot.lazy(() => NestedNode),
});

export type NodeTypeArray = typeof NodeTypeArray;

export type INodeTypeArray = valibot.InferOutput<NodeTypeArray>;

export const CheckNodeTypeArray = BuildCheckType(NodeTypeArray);
