import { NestedNode } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NestedNode";
import { NodeTypeObjectBase } from "@/business-logic/standards/especificacao/infrastructure/utils/nodes/schemas/NodeTypeObjectBase";
import * as valibot from "valibot";

export const NodeTypeObjectOperation = valibot.strictObject({
  ...NodeTypeObjectBase.entries,

  properties: valibot.object({
    input: valibot.optional(
      valibot.object({
        ...NodeTypeObjectBase.entries,

        properties: valibot.optional(
          valibot.object({
            queries: valibot.optional(
              valibot.object({
                ...NodeTypeObjectBase.entries,

                properties: valibot.optional(
                  valibot.object({
                    params: valibot.optional(
                      valibot.record(
                        valibot.string(),
                        valibot.lazy(() => NestedNode),
                      ),
                    ),
                    queries: valibot.optional(
                      valibot.record(
                        valibot.string(),
                        valibot.lazy(() => NestedNode),
                      ),
                    ),
                    body: valibot.optional(valibot.lazy(() => NestedNode)),
                  }),
                ),
              }),
            ),
          }),
        ),
      }),
    ),

    output: valibot.optional(
      valibot.object({
        ...NodeTypeObjectBase.entries,

        properties: valibot.optional(
          valibot.object({
            success: valibot.optional(valibot.lazy(() => NestedNode)),
          }),
        ),
      }),
    ),
  }),

  ["x-unispec-kind"]: valibot.literal("operation"),
  ["x-unispec-operation-id"]: valibot.string(),
});

export type NodeTypeObjectOperation = typeof NodeTypeObjectOperation;

export type INodeTypeObjectOperation = valibot.InferOutput<NodeTypeObjectOperation>;
