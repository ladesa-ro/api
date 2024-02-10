import { Field, InputType } from '@nestjs/graphql';
import { IObjectId } from '../../../../../domain';
import { IEnderecoCreateDto } from '../../../../../domain/dtos/ambientes/endereco/(dtos)/endereco-create/IEnderecoCreateDto';
import { ObjectIdDto } from '../../../(dtos)';

@InputType('EnderecoInputDto')
export class EnderecoInputDto implements IEnderecoCreateDto {
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
