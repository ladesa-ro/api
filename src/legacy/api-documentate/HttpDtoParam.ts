import { Param as NestHttpParamPrimitive } from '@nestjs/common';
import { GetPropertyValidator, GetSchema, IDeclarationProperty, IDeclarationPropertyMixed, IDeclarationPropertySimple, IOperation } from '@sisgea/spec';
import * as yup from 'yup';
import { ValidationPipeYup } from '../../validacao';

export const HttpDtoParam = (operation: IOperation, name: string) => {
  let property: IDeclarationProperty | null = null;

  const input = operation.input;

  if (input?.strategy === 'dto') {
    const inputProperties = input.params;

    const propertiesRecord = typeof inputProperties === 'function' ? inputProperties().properties : inputProperties ?? {};

    const foundProperty =
      Object.entries(propertiesRecord).find(([propertyKey, property]) => {
        let propertySimple: IDeclarationPropertySimple;

        if (property.type === 'mixed') {
          propertySimple = (property as IDeclarationPropertyMixed).input;
        } else {
          propertySimple = property as IDeclarationPropertySimple;
        }

        const propertyName = propertySimple.name ?? propertyKey;
        return propertyName === name;
      }) ?? null;

    if (foundProperty) {
      property = foundProperty[1];
    }
  }

  if (property === null) {
    throw new TypeError('Query param not found');
  }

  if (typeof property === 'string') {
    return NestHttpParamPrimitive(name);
  } else {
    const validator = GetPropertyValidator(property);

    const schema = GetSchema(validator, yup);

    return NestHttpParamPrimitive(
      name,
      new ValidationPipeYup(schema, {
        scope: 'param',
        path: name,
      }),
    );
  }
};
