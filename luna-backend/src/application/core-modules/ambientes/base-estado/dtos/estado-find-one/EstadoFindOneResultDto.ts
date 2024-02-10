import { ObjectType } from '@nestjs/graphql';
import { IBaseEstadoFindOneResultDto } from '../../../../../../domain';
import { DecorateProperty } from '../../../../../../infrastructure/adapters/decorators/DecorateProperty';

@ObjectType('EstadoFindOneResultDto')
export class EstadoFindOneResultDto implements IBaseEstadoFindOneResultDto {
  @DecorateProperty({
    type: 'int',
    description: 'ID IBGE do estado brasileiro.',
    nullable: false,
  })
  id!: number;

  @DecorateProperty({
    type: 'string',
    description: 'Nome oficial do estado.',
    nullable: false,
  })
  nome!: string;

  @DecorateProperty({
    type: 'string',
    description: 'Sigla UF do estado.',
    nullable: false,
  })
  sigla!: string;
}
