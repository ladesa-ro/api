import { FieldOptions, Int, ReturnTypeFunc } from '@nestjs/graphql';
import { ApiPropertyOptions } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { camelCase } from 'change-case';
import { CreateEntityDtoClass } from './CreateEntityDtoClass';

export type ICompiledProperty = {
  name: string;

  required: boolean;
  nullable: boolean;
  description: string;

  gql: {
    type: ReturnTypeFunc<any>;
  } & Omit<FieldOptions, 'description' | 'nullable'>;

  swagger: {
    type: Required<Pick<ApiPropertyOptions, 'type'>>['type'];
  } & Omit<ApiPropertyOptions, 'description' | 'nullable'>;

  designType: any;

  propertyDeclarationSimple: Spec.IDeclarationPropertySimple | null;
};

export const CompileDeclarationProperty = (
  propertyKey: string,
  propertyDeclaration: Spec.IDeclarationProperty,
  mode: Spec.IOutputDeclarationMode,
  dtoClassesMap: Map<any, any>,
  parent: string,
): ICompiledProperty | null => {
  let propertyDeclarationSimple: Spec.IDeclarationPropertySimple | null = null;

  switch (propertyDeclaration.type) {
    case Spec.PropertyTypes.MIXED: {
      const declarationRawMixed = propertyDeclaration as Spec.IDeclarationPropertyMixed;

      if (mode === Spec.OutputDeclarationModes.INPUT) {
        propertyDeclarationSimple = declarationRawMixed.input;
      }

      if (mode === Spec.OutputDeclarationModes.OUTPUT || mode === Spec.OutputDeclarationModes.SIMPLE) {
        propertyDeclarationSimple = declarationRawMixed.output;
      }

      break;
    }

    default: {
      propertyDeclarationSimple = propertyDeclaration as Spec.IDeclarationPropertySimple;
      break;
    }
  }

  let compiledProperty: ICompiledProperty | null = null;

  if (propertyDeclarationSimple) {
    const name = camelCase(propertyDeclarationSimple.name ?? propertyKey);

    compiledProperty = {
      name,

      designType: void 0,
      propertyDeclarationSimple,

      nullable: propertyDeclarationSimple.nullable,
      description: propertyDeclarationSimple.description,
      required: propertyDeclarationSimple.required !== false,

      gql: {
        type: () => void 0,
      },

      swagger: {
        type: 'null',
        isArray: propertyDeclarationSimple.arrayOf === true,
        required: propertyDeclarationSimple.required !== false,
      },
    };

    const gqlType = (obj: any) => {
      if (!propertyDeclarationSimple) {
        throw new TypeError();
      }

      if (propertyDeclarationSimple.arrayOf) {
        return () => [obj];
      }

      return () => obj;
    };

    switch (propertyDeclarationSimple.type) {
      case Spec.PropertyTypes.STRING: {
        compiledProperty.designType = String;
        compiledProperty.gql.type = gqlType(String);
        compiledProperty.swagger.type = 'string';
        break;
      }

      case Spec.PropertyTypes.UUID: {
        compiledProperty.designType = String;

        compiledProperty.gql.type = gqlType(String);
        compiledProperty.swagger.type = 'string';
        compiledProperty.swagger.format = 'uuid';

        break;
      }

      case Spec.PropertyTypes.INTEGER: {
        compiledProperty.designType = Number;

        compiledProperty.gql.type = gqlType(Int);
        compiledProperty.swagger.type = 'integer';

        break;
      }

      case Spec.PropertyTypes.DATE_TIME: {
        compiledProperty.designType = Date;

        compiledProperty.gql.type = gqlType(Date);
        compiledProperty.swagger.type = 'string';
        compiledProperty.swagger.format = 'date-time';

        break;
      }

      default: {
        const referencedFactory = propertyDeclarationSimple.type;

        if (typeof referencedFactory === 'function') {
          const referencedDeclaration = referencedFactory();

          const referencedDtoClass = CreateEntityDtoClass(referencedFactory, mode, dtoClassesMap, `${parent}.${propertyKey}`);

          compiledProperty.swagger.type = referencedDtoClass;

          if (referencedDeclaration.partialOf) {
            const referencedDtoClassFrom = CreateEntityDtoClass(referencedDeclaration.partialOf, mode, dtoClassesMap, `${parent}.${propertyKey}Original`);
            compiledProperty.designType = referencedDtoClassFrom;
            compiledProperty.gql.type = gqlType(referencedDtoClassFrom);
          } else {
            compiledProperty.designType = referencedDtoClass;
            compiledProperty.gql.type = gqlType(referencedDtoClass);
          }
        } else {
          compiledProperty.designType = void 0;
          compiledProperty = null;
        }

        break;
      }
    }
  }

  return compiledProperty;
};
