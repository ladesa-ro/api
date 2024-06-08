import { SetMetadata } from '@nestjs/common';
import { CheckView } from '@unispec/ast-builder';
import type { IUniNode } from '@unispec/ast-types';
import { NestImpl } from '@unispec/driver-nestjs';
import { getLadesaNodesRepository } from './repository';

export const OPERATION_KEY = 'operacao4';
export const COMBINED_INPUT_PARAM = 'combined_input';

export const CombinedInput = () => {
  return (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number) => {
    if (propertyKey) {
      const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

      if (descriptor) {
        SetMetadata(COMBINED_INPUT_PARAM, { parameterIndex })(target, propertyKey, descriptor);
      }
    }
  };
};

const dtoClassesMap = new Map<string, object>();

export const CompileDtoCtor = (opaqueTarget: string | IUniNode, meta?: Record<string, any> | undefined) => {
  const repository = getLadesaNodesRepository();

  const realTargetNode = repository.GetRealTarget(opaqueTarget);

  if (realTargetNode && CheckView(realTargetNode)) {
    const impl = new NestImpl(repository, dtoClassesMap);

    return impl.CompileCtor(realTargetNode, null, meta);
  } else {
    throw new TypeError();
  }
};
