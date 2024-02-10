import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IBaseCidadeFindOneResultDto } from '../../../../../../domain';

@ObjectType('CidadeFindOneResultDto')
export class CidadeFindOneResultDto implements IBaseCidadeFindOneResultDto {
  @ApiProperty({
    type: 'integer',
    description: 'ID IBGE da cidade brasileira.',
  })
  @Field(() => Int, {
    description: 'ID IBGE da cidade brasileira.',
  })
  id!: number;

  @ApiProperty({
    type: 'string',
    description: 'Nome oficial do estado.',
  })
  @Field(() => String, {
    description: 'Nome oficial do estado.',
  })
  nome!: string;
}
