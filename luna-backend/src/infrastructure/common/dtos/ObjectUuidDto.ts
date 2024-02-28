import { InputType } from '@nestjs/graphql';
import { DtoProperty } from '../../api-documentate';
import { CommonPropertyUuid } from '../CommonPropertyUuid';

@InputType('ObjectUuidDto')
export class ObjectUuidDto {
  @DtoProperty(CommonPropertyUuid())
  id!: string;
}
