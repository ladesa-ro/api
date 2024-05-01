import { Int } from '@nestjs/graphql';
import { createDtoPropertyOptions } from '../api-documentate';

// ======================================================================

export const CommonPropertyInteger = (description: string, nullable: boolean) =>
  createDtoPropertyOptions({
    nullable: nullable,
    description: description,

    gql: {
      type: () => Int,
    },

    swagger: {
      type: 'integer',
    },
  });
