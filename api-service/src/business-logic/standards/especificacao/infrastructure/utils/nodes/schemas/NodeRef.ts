import * as valibot from "valibot";

export const NodeRef = valibot.object({
  $ref: valibot.string(),
});

export type NodeRef = typeof NodeRef;

export type INodeRef = valibot.InferOutput<NodeRef>;
