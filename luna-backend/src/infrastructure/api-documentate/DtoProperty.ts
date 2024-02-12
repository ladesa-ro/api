import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions, ReturnTypeFunc } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { omit } from 'lodash';

export type IDtoPropertyOptions = {
  nullable: boolean;
  description: string;

  gql: {
    type: ReturnTypeFunc<any>;
  } & Omit<FieldOptions, 'description' | 'nullable'>;

  swagger: {
    type: Required<Pick<ApiPropertyOptions, 'type'>>['type'];
  } & Omit<ApiPropertyOptions, 'description' | 'nullable'>;
};

export const DtoProperty = (options: IDtoPropertyOptions) => {
  const { nullable, description, gql, swagger } = options;

  return applyDecorators(
    ApiProperty({
      nullable: nullable,
      description: description,
      ...swagger,
    }),

    Field(gql.type, {
      nullable: nullable,
      description: description,
      ...omit(gql, ['type']),
    }),
  );
};

export const createDtoPropertyOptions = <Opts extends IDtoPropertyOptions>(
  options: Opts,
) => options;
