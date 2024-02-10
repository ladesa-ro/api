import { InputType } from '@nestjs/graphql';
import { IBaseEstadoFindOneByUfInputDto } from '../../../../../../domain';
import { DecorateProperty } from '../../../../../../infrastructure/adapters/decorators/DecorateProperty';

@InputType('EstadoFindOneByUfInputDto')
export class EstadoFindOneByUfInputDto
  implements IBaseEstadoFindOneByUfInputDto
{
  @DecorateProperty({
    type: 'string',
    description: 'Sigla UF do estado.',
    nullable: false,
  })
  uf!: IBaseEstadoFindOneByUfInputDto['uf'];
}
