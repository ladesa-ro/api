import { Field, InputType } from '@nestjs/graphql';
import { ObjectIdDto } from '../../../(dtos)';
import { IObjectId } from '../../../../../domain';
import { IEnderecoCreateDto } from '../../../../../domain/dtos/ambientes/endereco/(dtos)/endereco-create/IEnderecoCreateDto';
import { DecorateProperty } from '../../../../../infrastructure/adapters/decorators/DecorateProperty';

@InputType('EnderecoInputDto')
export class EnderecoInputDto implements IEnderecoCreateDto {
  @DecorateProperty({
    type: 'string',
    description: 'CEP do Endereço',
    nullable: false,
  })
  cep!: string;

  @DecorateProperty({
    type: 'string',
    description: 'Logradouro do Endereço',
    nullable: false,
  })
  logradouro!: string;

  @DecorateProperty({
    type: 'int',
    description: 'Número do Endereço',
    nullable: false,
  })
  numero!: number;

  @DecorateProperty({
    type: 'string',
    description: 'Bairro do Endereço',
    nullable: false,
  })
  bairro!: string;

  @DecorateProperty({
    type: 'string',
    description: 'Complemento do Endereço',
    nullable: true,
  })
  @Field(() => String, { nullable: true })
  complemento!: string | null;

  @DecorateProperty({
    type: 'string',
    description: 'Ponto de referência do Endereço',
    nullable: true,
  })
  pontoReferencia!: string | null;

  @DecorateProperty({
    type: () => ObjectIdDto,
    description: 'Cidade do Endereço',
    nullable: false,
  })
  cidade!: IObjectId;
}
