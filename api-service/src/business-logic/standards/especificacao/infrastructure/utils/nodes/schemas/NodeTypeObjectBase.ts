import { NestedNode } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import { NodeBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import * as valibot from "valibot";

export const NodeTypeObjectBase = valibot.object({
  ...NodeBase.entries,

  ["x-unispec-kind"]: valibot.never(),

  type: valibot.literal("object"),

  properties: valibot.record(
    valibot.string(),
    valibot.lazy(() => NestedNode),
  ),

  required: valibot.optional(valibot.array(valibot.string())),

  additionalProperties: valibot.optional(valibot.boolean()),
});

export type NodeTypeObjectBase = typeof NodeTypeObjectBase;

export type INodeTypeObjectBase = valibot.InferOutput<NodeTypeObjectBase>;
