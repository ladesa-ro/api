import { Node } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/Node";
import { NodeBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeBase";
import * as valibot from "valibot";

export const NestedNode = valibot.lazy(() => Node);

export type NestedNode = typeof NodeBase;
export type INestedNode = valibot.InferOutput<NestedNode>;
