import { InputType } from '@nestjs/graphql';
import { IBaseEstadoFindOneByIdInputDto } from '../../../../../../domain';
import { DecorateProperty } from '../../../../../../infrastructure/adapters/decorators/DecorateProperty';

@InputType('EstadoFindOneByIdInputDto')
export class EstadoFindOneByIdInputDto
  implements IBaseEstadoFindOneByIdInputDto
{
  @DecorateProperty({
    type: 'int',
    description: 'ID IBGE do estado.',
    nullable: false,
  })
  id!: IBaseEstadoFindOneByIdInputDto['id'];
}
