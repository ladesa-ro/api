import { InputType, Int, ObjectType } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { __decorate, __metadata } from 'tslib';
import * as yup from 'yup';
import { DtoProperty, IDtoOperationOptions, IDtoPropertyOptions } from '../api-documentate';

const rootDtoClassesMap = new Map<any, any>();

export const createEntityDtoClass = <Factory extends () => Spec.IDeclaration>(factory: Factory, mode: Spec.IOutputDeclarationMode = 'output', dtoClassesMap = rootDtoClassesMap, parent = '') => {
  const declaration = factory();

  let dtoClassName = declaration.name;

  if (mode === 'input' && !dtoClassName.toLocaleLowerCase().includes('input')) {
    dtoClassName = `${dtoClassName}Input`;
  }

  if (!dtoClassName.toLocaleLowerCase().includes('dto')) {
    dtoClassName = `${dtoClassName}Dto`;
  }

  if (dtoClassesMap && dtoClassesMap.has(dtoClassName)) {
    return dtoClassesMap.get(dtoClassName);
  }

  function EntityDtoClass() {}

  const decoratedClass = __decorate(
    [
      //
      ...(mode === 'input'
        ? [
            //
            InputType(dtoClassName),
          ]
        : [
            //
            ObjectType(dtoClassName),
          ]),
    ],
    EntityDtoClass,
  );

  if (dtoClassesMap) {
    dtoClassesMap.set(dtoClassName, decoratedClass);
  }

  for (const propertyKey in declaration.properties) {
    const declarationRaw = declaration.properties[propertyKey];

    let declarationTarget: Spec.IDeclarationPropertySimple | null = null;

    switch (declarationRaw.type) {
      case Spec.PropertyTypes.MIXED: {
        const declarationRawMixed = declarationRaw as Spec.IDeclarationPropertyMixed;

        if (mode === Spec.OutputDeclarationModes.INPUT) {
          declarationTarget = declarationRawMixed.input;
        }

        if (mode === Spec.OutputDeclarationModes.OUTPUT || mode === Spec.OutputDeclarationModes.SIMPLE) {
          declarationTarget = declarationRawMixed.output;
        }

        break;
      }

      default: {
        declarationTarget = declarationRaw as Spec.IDeclarationPropertySimple;
        break;
      }
    }

    if (declarationTarget) {
      const name = propertyKey;

      let dtoPropertyOptions: IDtoPropertyOptions | null = {
        description: declarationTarget.description,
        nullable: declarationTarget.nullable,

        gql: {
          type: () => void 0,
        },

        swagger: {
          type: 'null',
          isArray: declarationTarget.arrayOf === true,
          required: declarationTarget.required !== false,
        },
      };

      let designType: any = void 0;

      const gqlType = (obj: any) => {
        if (!declarationTarget) {
          throw new TypeError();
        }

        if (declarationTarget.arrayOf) {
          return () => [obj];
        }

        return () => obj;
      };

      switch (declarationTarget.type) {
        case Spec.PropertyTypes.STRING: {
          designType = String;

          dtoPropertyOptions.gql.type = gqlType(String);
          dtoPropertyOptions.swagger.type = 'string';

          break;
        }

        case Spec.PropertyTypes.UUID: {
          designType = String;

          dtoPropertyOptions.gql.type = gqlType(String);
          dtoPropertyOptions.swagger.type = 'string';
          dtoPropertyOptions.swagger.format = 'uuid';

          break;
        }

        case Spec.PropertyTypes.INTEGER: {
          designType = Number;

          dtoPropertyOptions.gql.type = gqlType(Int);
          dtoPropertyOptions.swagger.type = 'integer';

          break;
        }

        case Spec.PropertyTypes.DATE_TIME: {
          designType = Date;

          dtoPropertyOptions.gql.type = gqlType(Date);
          dtoPropertyOptions.swagger.type = 'string';
          dtoPropertyOptions.swagger.format = 'date-time';

          break;
        }

        default: {
          const referencedFactory = declarationTarget.type;

          if (typeof referencedFactory === 'function') {
            const referencedDeclaration = referencedFactory();

            const referencedDtoClass = createEntityDtoClass(referencedFactory, mode, dtoClassesMap, `${parent}.${propertyKey}`);

            dtoPropertyOptions.swagger.type = referencedDtoClass;

            if (referencedDeclaration.partialOf) {
              const referencedDtoClassFrom = createEntityDtoClass(referencedDeclaration.partialOf, mode, dtoClassesMap, `${parent}.${propertyKey}Original`);
              designType = referencedDtoClassFrom;
              dtoPropertyOptions.gql.type = gqlType(referencedDtoClassFrom);
            } else {
              designType = referencedDtoClass;
              dtoPropertyOptions.gql.type = gqlType(referencedDtoClass);
            }
          } else {
            designType = void 0;
            dtoPropertyOptions = null;
          }

          break;
        }
      }

      if (dtoPropertyOptions !== null) {
        __decorate(
          [
            //
            DtoProperty(dtoPropertyOptions),
            __metadata('design:type', designType),
          ],
          EntityDtoClass.prototype,
          name,
          void 0,
        );
      }
    }
  }

  Object.defineProperty(EntityDtoClass, 'name', { value: dtoClassName });

  return decoratedClass;
};

export const createOperationOptionsFromOperator = (operation: Spec.IOperation) => {
  const operationOptions: IDtoOperationOptions = {
    description: operation.description,

    gql: null,
    swagger: {
      returnType: {
        schema: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
      params: [],
      queries: [],
    },
  };

  if (operation.input) {
    if (operation.input.strategy === 'dto') {
      for (const [name, config] of Object.entries(operation.input.params ?? [])) {
        operationOptions.swagger.params ||= [];

        if (config.type !== 'mixed' && typeof config.type === 'string') {
          const configSimple = config as Spec.IDeclarationPropertySimple;

          operationOptions.swagger.params.push({
            name,
            description: configSimple.description,
            required: configSimple.required !== false,
            validationContract: () => Spec.GetSchema(Spec.GetPropertyValidator(configSimple), yup),
          });
        }
      }

      for (const [name, config] of Object.entries(operation.input.query ?? [])) {
        operationOptions.swagger.queries ||= [];

        if (config.type !== 'mixed' && typeof config.type === 'string') {
          const configSimple = config as Spec.IDeclarationPropertySimple;

          operationOptions.swagger.queries.push({
            name,
            validationContract: () => Spec.GetSchema(Spec.GetPropertyValidator(configSimple), yup),
            description: configSimple.description,
            required: configSimple.required !== false,
          });
        }
      }
    }
  }

  if (operation.output.strategy === 'file') {
    operationOptions.meta ||= {};
    operationOptions.meta.getFile ||= {
      mimeType: 'application/octet-stream',
    };
  }

  return operationOptions;
};
