import { InputType } from '@nestjs/graphql';
import { DtoProperty } from '../../api-documentate';
import { CommonPropertyUuid } from '../CommonPropertyUuid';

@InputType('ObjectUuidDtoLegacy')
export class ObjectUuidDtoLegacy {
  @DtoProperty(CommonPropertyUuid())
  id!: string;
}
