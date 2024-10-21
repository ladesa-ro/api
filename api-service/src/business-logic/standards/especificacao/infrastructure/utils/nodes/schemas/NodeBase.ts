import { NestedNode } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import * as valibot from "valibot";

export const NodeBase = valibot.object({
  $schema: valibot.optional(valibot.literal("https://json-schema.org/draft/2020-12/schema")),
  $id: valibot.optional(valibot.string()),

  $ref: valibot.optional(valibot.string()),

  anyOf: valibot.optional(valibot.array(valibot.lazy(() => NestedNode))),

  description: valibot.optional(valibot.string()),
  type: valibot.optional(valibot.string()),
});

export type NodeBase = typeof NodeBase;

export type INodeBase = valibot.InferOutput<NodeBase>;
