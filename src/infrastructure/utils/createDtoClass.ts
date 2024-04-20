import { Int, ObjectType } from '@nestjs/graphql';
import { EntityDeclaration, EntityDeclarationPropertyFragmentR, InferFactoryEntityType } from '@sisgea/spec';
import { __decorate, __metadata } from 'tslib';
import { DtoProperty } from '../api-documentate';

export const createEntityDtoClass = <Factory extends () => EntityDeclaration>(factory: Factory, mode: 'simple' | 'input' | 'output' = 'simple') => {
  const declaration = factory();

  function EntityDtoClass() {}

  type EntityType = InferFactoryEntityType<typeof factory, 'output'>;

  for (const propertyKey in declaration.properties) {
    const declarationRaw = declaration.properties[propertyKey];

    let declarationTarget: EntityDeclarationPropertyFragmentR | null = null;

    switch (declarationRaw.type) {
      case 'io': {
        if (mode === 'input') {
          declarationTarget = declarationRaw.input;
        }
        if (mode === 'output') {
          declarationTarget = declarationRaw.output;
        }

        break;
      }

      default: {
        declarationTarget = declarationRaw;
        break;
      }
    }

    if (declarationTarget) {
      const name = propertyKey;

      let designType: any;
      let gqlType: any = null;

      if (declarationTarget.type === 'string' || declarationTarget.type === 'uuid') {
        designType = String;
        gqlType = String;
      } else if (declarationTarget.type === 'integer') {
        designType = Number;
        gqlType = Int;
      } else {
        designType = Object;
        gqlType = null;
      }

      const exposeField = !name.startsWith('date') && gqlType !== null;

      if (designType !== Object) {
        __decorate(
          [
            //
            ...(exposeField
              ? [
                  DtoProperty({
                    description: declarationTarget.description,
                    nullable: declarationTarget.nullable,

                    gql: {
                      type: () => gqlType,
                    },
                    swagger: {
                      type: declarationTarget.type,
                    },
                  }),
                ]
              : []),

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
