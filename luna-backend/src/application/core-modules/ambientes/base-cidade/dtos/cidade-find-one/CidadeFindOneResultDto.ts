import { ObjectType } from '@nestjs/graphql';
import { IBaseCidadeFindOneResultDto } from '../../../../../../domain';
import { DecorateProperty } from '../../../../../../infrastructure/adapters/decorators/DecorateProperty';

@ObjectType('CidadeFindOneResultDto')
export class CidadeFindOneResultDto implements IBaseCidadeFindOneResultDto {
  @DecorateProperty({
    type: 'int',
    description: 'ID IBGE da cidade brasileira.',
    nullable: false,
  })
  id!: number;

  @DecorateProperty({
    type: 'string',
    description: 'Nome oficial do estado.',
    nullable: false,
  })
  nome!: string;
}
