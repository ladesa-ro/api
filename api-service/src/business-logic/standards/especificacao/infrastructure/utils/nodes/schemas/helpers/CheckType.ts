import * as valibot from "valibot";

export const CheckType = <const TSchema extends valibot.BaseSchema<unknown, unknown, valibot.BaseIssue<unknown>>, Out extends valibot.InferInput<TSchema>>(schema: TSchema, data: any): data is Out => {
  return valibot.is(schema, data);
};
