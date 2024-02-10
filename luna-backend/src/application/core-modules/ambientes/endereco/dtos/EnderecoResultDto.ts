import { Field, ObjectType } from '@nestjs/graphql';
import { ObjectIdDto } from '../../../(dtos)';
import { IObjectId } from '../../../../../domain';
import { IEnderecoCreateDto } from '../../../../../domain/dtos/ambientes/endereco/(dtos)/endereco-create/IEnderecoCreateDto';

@ObjectType('EnderecoResultDto')
export class EnderecoResultDto implements IEnderecoCreateDto {
  @Field(() => String, { nullable: false })
  cep!: string;

  @Field(() => String, { nullable: false })
  logradouro!: string;

  @Field(() => String, { nullable: false })
  numero!: number;

  @Field(() => String, { nullable: false })
  bairro!: string;

  @Field(() => String, { nullable: true })
  complemento!: string | null;

  @Field(() => String, { nullable: true })
  pontoReferencia!: string | null;

  @Field(() => ObjectIdDto, { nullable: false })
  cidade!: IObjectId;
}
