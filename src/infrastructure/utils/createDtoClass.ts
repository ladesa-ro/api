import { Int, ObjectType } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { __decorate, __metadata } from 'tslib';
import { DtoProperty, IDtoPropertyOptions } from '../api-documentate';

export const createEntityDtoClass = <Factory extends () => Spec.IEntityDeclarationRaw>(factory: Factory, mode: Spec.IOutputDeclarationMode = 'simple') => {
  const declaration = factory();

  function EntityDtoClass() {}

  type EntityType = Spec.InferFactoryEntityType<typeof factory, 'output'>;

  for (const propertyKey in declaration.properties) {
    const declarationRaw = declaration.properties[propertyKey];

    let declarationTarget: Spec.IEntityDeclarationRawPropertySimple | null = null;

    switch (declarationRaw.type) {
      case Spec.PropertyTypes.MIXED: {
        const declarationRawMixed = declarationRaw as Spec.IEntityDeclarationRawPropertyMixed;

        if (mode === Spec.OutputDeclarationModes.INPUT) {
          declarationTarget = declarationRawMixed.input;
        }
        if (mode === 'output') {
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
        },
      };

      let designType: any = void 0;

      switch (declarationTarget.type) {
        case Spec.PropertyTypes.STRING: {
          designType = String;
          dtoPropertyOptions.gql = {
            type: () => String,
          };

          dtoPropertyOptions.swagger = {
            type: 'string',
          };

          break;
        }

        case Spec.PropertyTypes.UUID: {
          designType = String;

          dtoPropertyOptions.gql = {
            type: () => String,
          };

          dtoPropertyOptions.swagger = {
            type: 'string',
            format: 'uuid',
          };

          break;
        }

        case Spec.PropertyTypes.INTEGER: {
          designType = Number;

          dtoPropertyOptions.gql = {
            type: () => Int,
          };

          dtoPropertyOptions.swagger = {
            type: 'integer',
          };

          break;
        }

        case Spec.PropertyTypes.DATE_TIME: {
          designType = Date;

          dtoPropertyOptions.gql = {
            type: () => Date,
          };

          dtoPropertyOptions.swagger = {
            type: 'string',
            format: 'date-time',
          };

          break;
        }

        default: {
          designType = void 0;
          dtoPropertyOptions = null;
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

  Object.defineProperty(EntityDtoClass, 'name', { value: `${declaration.name}Dto` });

  const decoratedClass = __decorate(
    [
      //
      ObjectType(declaration.name),
    ],
    EntityDtoClass,
  );

  return decoratedClass as EntityType;
};
