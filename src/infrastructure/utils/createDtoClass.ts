import { InputType, Int, ObjectType } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { __decorate, __metadata } from 'tslib';
import { DtoProperty, IDtoPropertyOptions } from '../api-documentate';

const rootDtoClassesMap = new Map<any, any>();

export const createEntityDtoClass = <Factory extends () => Spec.IEntityDeclarationRaw<any>>(factory: Factory, mode: Spec.IOutputDeclarationMode = 'output', dtoClassesMap = rootDtoClassesMap) => {
  const declaration = factory();

  const dtoClassName = declaration.name.toLocaleLowerCase().includes('dto') ? declaration.name : `${declaration.name}Dto`;

  if (dtoClassesMap && dtoClassesMap.has(dtoClassName)) {
    return dtoClassesMap.get(dtoClassName);
  }

  function EntityDtoClass() {}

  type EntityType = Spec.InferFactoryEntityType<typeof factory, 'output'>;

  const decoratedClass = __decorate(
    [
      //
      ...(mode === 'input'
        ? [
            //
            InputType(declaration.name),
          ]
        : [
            //
            ObjectType(declaration.name),
          ]),
    ],
    EntityDtoClass,
  ) as EntityType;

  if (dtoClassesMap) {
    dtoClassesMap.set(dtoClassName, decoratedClass);
  }

  for (const propertyKey in declaration.properties) {
    const declarationRaw = declaration.properties[propertyKey];

    let declarationTarget: Spec.IEntityDeclarationRawPropertySimple | null = null;

    switch (declarationRaw.type) {
      case Spec.PropertyTypes.MIXED: {
        const declarationRawMixed = declarationRaw as Spec.IEntityDeclarationRawPropertyMixed;

        if (mode === Spec.OutputDeclarationModes.INPUT) {
          declarationTarget = declarationRawMixed.input;
        }

        if (mode === Spec.OutputDeclarationModes.OUTPUT || mode === Spec.OutputDeclarationModes.SIMPLE) {
          declarationTarget = declarationRawMixed.output;
        }

        break;
      }

      default: {
        declarationTarget = declarationRaw as Spec.IEntityDeclarationRawPropertySimple;
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

            const referencedDtoClass = createEntityDtoClass(referencedFactory, mode, dtoClassesMap);

            dtoPropertyOptions.swagger.type = referencedDtoClass;

            if (referencedDeclaration.partialOf) {
              const referencedDtoClassFrom = createEntityDtoClass(referencedDeclaration.partialOf, mode, dtoClassesMap);
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
