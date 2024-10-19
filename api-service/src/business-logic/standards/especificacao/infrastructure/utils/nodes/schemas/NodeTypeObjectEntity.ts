import { NodeTypeObjectBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObjectBase";
import * as valibot from "valibot";

export const NodeTypeObjectEntity = valibot.strictObject({
  ...NodeTypeObjectBase.entries,
  ["x-unispec-kind"]: valibot.literal("entity"),
  ["x-unispec-entity-id"]: valibot.string(),
  ["x-unispec-entity-partial-of"]: valibot.optional(valibot.string()),
});

export type NodeTypeObjectEntity = typeof NodeTypeObjectEntity;

export type INodeTypeObjectEntity = valibot.InferOutput<NodeTypeObjectEntity>;
