import { InputType } from '@nestjs/graphql';
import { IBaseEstadoFindOneByIdInputDto as IBaseCidadeFindOneByIdInputDto } from '../../../../../../domain';
import { DecorateProperty } from '../../../../../../infrastructure/adapters/decorators/DecorateProperty';

@InputType('CidadeFindOneByIdInputDto')
export class CidadeFindOneByIdInputDto
  implements IBaseCidadeFindOneByIdInputDto
{
  @DecorateProperty({
    type: 'int',
    description: 'ID IBGE da cidade.',
    nullable: false,
  })
  id!: IBaseCidadeFindOneByIdInputDto['id'];
}
