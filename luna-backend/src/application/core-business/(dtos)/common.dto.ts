import { Field, InputType, Int } from '@nestjs/graphql';
import { createDtoPropertyOptions } from '../../../infrastructure';

// ======================================================================

@InputType('ObjectIdDto')
export class ObjectIdDto {
  @Field(() => Int, { nullable: false })
  id!: number;
}

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

// ======================================================================

@InputType('ObjectUuidDto')
export class ObjectUuidDto {
  @Field(() => String, { nullable: false })
  id!: string;
}

export const CommonPropertyUuid = (description: string = 'UUID do registro.') =>
  createDtoPropertyOptions({
    nullable: false,
    description: description,

    gql: {
      type: () => String,
    },

    swagger: {
      type: 'uuid',
    },
  });

// ======================================================================
