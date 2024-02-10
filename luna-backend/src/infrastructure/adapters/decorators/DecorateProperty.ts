import { applyDecorators } from '@nestjs/common';
import { Field, FieldOptions, Int } from '@nestjs/graphql';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

type IDecoratePropertyOptions = {
  type: 'string' | 'int' | (() => any);
  description: string;
  nullable?: boolean;

  gql?: FieldOptions;
  swagger?: ApiPropertyOptions;
};

const getNativeGqlType = (type: IDecoratePropertyOptions['type']) => {
  if (type === 'string') {
    return () => String;
  }

  if (type === 'int') {
    return () => Int;
  }

  return type;
};

const getNativeSwaggerType = (type: IDecoratePropertyOptions['type']) => {
  if (type === 'int') {
    return 'number';
  }

  return type;
};

export const DecorateProperty = (options: IDecoratePropertyOptions) => {
  const { type, description, nullable, swagger, gql } = options;

  const decorators: Array<
    ClassDecorator | MethodDecorator | PropertyDecorator
  > = [];

  decorators.push(
    ApiProperty({
      type: getNativeSwaggerType(type),
      description,
      nullable,
      ...swagger,
    }),
  );

  decorators.push(
    Field(getNativeGqlType(type), {
      description,
      nullable,
      ...gql,
    }),
  );

  return applyDecorators(...decorators);
};
