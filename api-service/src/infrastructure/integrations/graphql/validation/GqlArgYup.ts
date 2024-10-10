import { ValidationPipeYup } from "@/infrastructure/fixtures";
import { Args } from "@nestjs/graphql";
import type { ArgsOptions } from "@nestjs/graphql/dist/decorators/args.decorator";
import type { Schema } from "yup";

export const GqlArgYup = (property: string, yupSchema: Schema<any, any>, options?: ArgsOptions) => {
  return Args(property, { ...options }, new ValidationPipeYup(yupSchema, { scope: "arg", path: property }));
};
