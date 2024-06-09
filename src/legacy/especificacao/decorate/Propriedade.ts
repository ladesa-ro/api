import { applyDecorators } from '@nestjs/common';
import { Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { merge, omit } from 'lodash';
import { ICompiledProperty } from '../utilitarios/CompileDeclarationProperty';

export const Propriedade = (compiledProperty: ICompiledProperty) => {
  const { nullable, required = true, description, swagger, gql } = merge({}, compiledProperty) as ICompiledProperty;

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
