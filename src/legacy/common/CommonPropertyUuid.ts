import { createDtoPropertyOptions } from '../api-documentate';

// ======================================================================

export const CommonPropertyUuid = (description: string = 'UUID do registro.') =>
  createDtoPropertyOptions({
    nullable: false,
    description: description,

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'string',
    },
  });
