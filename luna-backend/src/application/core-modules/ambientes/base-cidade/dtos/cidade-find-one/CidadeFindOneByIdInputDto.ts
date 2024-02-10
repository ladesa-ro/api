import { Field, InputType, Int } from '@nestjs/graphql';
import { IBaseEstadoFindOneByIdInputDto as IBaseCidadeFindOneByIdInputDto } from '../../../../../../domain';

@InputType('CidadeFindOneByIdInputDto')
export class CidadeFindOneByIdInputDto
  implements IBaseCidadeFindOneByIdInputDto
{
  @Field(() => Int, {
    description: 'ID IBGE da cidade.',
  })
  id!: IBaseCidadeFindOneByIdInputDto['id'];
}
