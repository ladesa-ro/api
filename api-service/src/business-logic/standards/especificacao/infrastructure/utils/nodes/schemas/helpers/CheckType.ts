import * as valibot from "valibot";

export const CheckType = <const TSchema extends valibot.BaseSchema<unknown, unknown, valibot.BaseIssue<unknown>>, Out extends valibot.InferInput<TSchema>>(schema: TSchema, data: any): data is Out => {
  return valibot.is(schema, data);
};

export const BuildCheckType = <const TSchema extends valibot.BaseSchema<unknown, unknown, valibot.BaseIssue<unknown>>, Out extends valibot.InferInput<TSchema>>(schema: TSchema) => {
  return (node: any): node is Out => {
    return CheckType<TSchema, Out>(schema, node);
  };
};
