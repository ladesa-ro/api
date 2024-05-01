import { InputType } from '@nestjs/graphql';
import { DtoProperty } from '../../api-documentate';
import { CommonPropertyId } from '../CommonPropertyId';

@InputType('ObjectIdDto')
export class ObjectIdDto {
  @DtoProperty(CommonPropertyId())
  id!: number;
}
