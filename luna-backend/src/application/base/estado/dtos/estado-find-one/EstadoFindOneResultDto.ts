import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IBaseEstadoFindOneResultDto } from '../../../../../domain';

@ObjectType('EstadoFindOneResultDto')
export class EstadoFindOneResultDto implements IBaseEstadoFindOneResultDto {
  @ApiProperty({
    type: 'integer',
    description: 'ID IBGE do estado brasileiro.',
  })
  @Field(() => Int, {
    description: 'ID IBGE do estado brasileiro.',
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

  @ApiProperty({
    type: 'string',
    description: 'Sigla UF do estado.',
  })
  @Field(() => String, {
    description: 'Sigla UF do estado.',
  })
  sigla!: string;
}
