import { IDeclarationProperty, IDeclarator } from '@sisgea/spec';

export const CastDeclarator = (name: string, inputDynamicDeclarator: IDeclarator | Record<string, IDeclarationProperty> | null | undefined | void) => {
  let inputDeclarator: IDeclarator | null = null;

  if (inputDynamicDeclarator) {
    if (typeof inputDynamicDeclarator === 'function') {
      inputDeclarator = inputDynamicDeclarator;
    } else {
      inputDeclarator = () => ({
        name,
        properties: {
          ...inputDynamicDeclarator,
        },
      });
    }
  }

  return inputDeclarator;
};
