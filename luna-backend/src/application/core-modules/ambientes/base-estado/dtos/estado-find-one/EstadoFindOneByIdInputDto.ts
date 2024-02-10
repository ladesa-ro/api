import { Field, InputType, Int } from '@nestjs/graphql';
import { IBaseEstadoFindOneByIdInputDto } from '../../../../../../domain';

@InputType('EstadoFindOneByIdInputDto')
export class EstadoFindOneByIdInputDto
  implements IBaseEstadoFindOneByIdInputDto
{
  @Field(() => Int, {
    description: 'ID IBGE do estado.',
  })
  id!: IBaseEstadoFindOneByIdInputDto['id'];
}
