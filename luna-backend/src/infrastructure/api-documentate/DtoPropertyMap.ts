import { IDtoPropertyOptions } from './DtoProperty';

export type DtoPropertyMap = Record<string, IDtoPropertyOptions>;

export const createDtoPropertyMap = <Def extends DtoPropertyMap>(
  options: Def,
) => options;
