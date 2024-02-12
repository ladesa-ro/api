import { ObjectType } from '@nestjs/graphql';
import { ICidadeModel, IEnderecoFindOneResultDto } from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { EnderecoDtoProperties } from './endereco.dto';

@ObjectType('EnderecoFindOneResultDto')
export class EnderecoFindOneResultDto implements IEnderecoFindOneResultDto {
  @DtoProperty(EnderecoDtoProperties.ENDERECO_ID)
  id!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_CEP)
  cep!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_LOGRADOURO)
  logradouro!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_NUMERO)
  numero!: number;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_BAIRRO)
  bairro!: string;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_COMPLEMENTO)
  complemento!: string | null;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_PONTO_REFERENCIA)
  pontoReferencia!: string | null;

  @DtoProperty(EnderecoDtoProperties.ENDERECO_CIDADE_OUTPUT)
  cidade!: ICidadeModel;
}
