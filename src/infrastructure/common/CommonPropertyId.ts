import { Int } from '@nestjs/graphql';
import { createDtoPropertyOptions } from '../api-documentate';

// ======================================================================

export const CommonPropertyId = (description: string = 'ID do registro.') =>
  createDtoPropertyOptions({
    nullable: false,
    description: description,

    gql: {
      type: () => Int,
    },

    swagger: {
      type: 'integer',
    },
  });
