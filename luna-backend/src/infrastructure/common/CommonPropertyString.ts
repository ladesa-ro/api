import { createDtoPropertyOptions } from '../api-documentate';

// ======================================================================

export const CommonPropertyString = (description: string, nullable: boolean) =>
  createDtoPropertyOptions({
    nullable: nullable,
    description: description,

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  });
