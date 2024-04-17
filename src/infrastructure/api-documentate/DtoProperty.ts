import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { merge, omit } from 'lodash';
import { DeepPartial } from 'typeorm';

export type IDtoPropertyOptions = {
  required?: boolean;
  nullable: boolean;
  description: string;

  gql: {
    type: ReturnTypeFunc<any>;
  } & Omit<FieldOptions, 'description' | 'nullable'>;

  swagger: {
    type: Required<Pick<ApiPropertyOptions, 'type'>>['type'];
  } & Omit<ApiPropertyOptions, 'description' | 'nullable'>;
};

export const DtoProperty = (options: IDtoPropertyOptions, ...customOptions: DeepPartial<IDtoPropertyOptions>[]) => {
  const { nullable, required = true, description, gql, swagger } = <IDtoPropertyOptions>merge({}, options, ...customOptions);

  return applyDecorators(
    ApiProperty({
      required: required,
      nullable: nullable,
      description: description,
      ...swagger,
    }),

    Field(gql.type, {
      nullable: nullable || !required,
      description: description,
      ...omit(gql, ['type']),
    }),
  );
};

export const createDtoPropertyOptions = <Opts extends IDtoPropertyOptions>(options: Opts) => options;
