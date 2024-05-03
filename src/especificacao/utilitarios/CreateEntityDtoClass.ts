import { ArgsType, InputType, ObjectType } from '@nestjs/graphql';
import * as Spec from '@sisgea/spec';
import { pascalCase } from 'change-case';
import { __decorate, __metadata } from 'tslib';
import { Propriedade } from '../decorate/Propriedade';
import { CompileDeclarationProperty } from './CompileDeclarationProperty';

const rootDtoClassesMap = new Map<any, any>();

export const CreateEntityDtoClass = <Factory extends () => Spec.IDeclaration>(
  factory: Factory,
  mode: Spec.IOutputDeclarationMode = 'output',
  dtoClassesMap = rootDtoClassesMap,
  parent = '',
  gqlStrategy: null | 'args-type' = null,
) => {
  const declaration = factory();

  let dtoClassName = pascalCase(declaration.name);

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

  const classDecorators = [];

  if (gqlStrategy === 'args-type') {
    classDecorators.push(ArgsType());
  } else if (mode === 'input') {
    classDecorators.push(InputType(dtoClassName));
  } else if (mode === 'output' || mode === 'simple') {
    classDecorators.push(ObjectType(dtoClassName));
  }

  const decoratedClass = __decorate(classDecorators, EntityDtoClass);

  if (dtoClassesMap) {
    dtoClassesMap.set(dtoClassName, decoratedClass);
  }

  for (const propertyKey in declaration.properties) {
    const compiledProperty = CompileDeclarationProperty(propertyKey, declaration.properties[propertyKey], mode, dtoClassesMap, parent);

    if (compiledProperty !== null) {
      const name = compiledProperty.name;

      __decorate(
        [
          //
          Propriedade(compiledProperty),
          __metadata('design:type', compiledProperty.designType),
        ],
        EntityDtoClass.prototype,
        name,
        void 0,
      );
    }
  }

  Object.defineProperty(EntityDtoClass, 'name', { value: dtoClassName });

  return decoratedClass;
};
