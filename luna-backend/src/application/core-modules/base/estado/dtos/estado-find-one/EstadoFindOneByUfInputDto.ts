import { Field, InputType } from '@nestjs/graphql';
import { IBaseEstadoFindOneByUfInputDto } from '../../../../../../domain';

@InputType('EstadoFindOneByUfInputDto')
export class EstadoFindOneByUfInputDto
  implements IBaseEstadoFindOneByUfInputDto
{
  @Field(() => String, {
    description: 'Sigla UF do estado.',
  })
  uf!: IBaseEstadoFindOneByUfInputDto['uf'];
}
