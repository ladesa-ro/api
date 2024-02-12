import { Field, InputType, Int } from '@nestjs/graphql';
import { DtoProperty, createDtoPropertyOptions } from '../../../infrastructure';

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

@InputType('ObjectIdDto')
export class ObjectIdDto {
  @DtoProperty(CommonPropertyId())
  id!: number;
}

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
      type: 'string',
    },
  });

// ======================================================================
