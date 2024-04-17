import { InputType } from '@nestjs/graphql';
import * as yup from 'yup';
import { IEnderecoInputDto, IObjectId } from '../../../(spec)';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { EnderecoDtoProperties, EnderecoDtoValidationContract } from './endereco.dto';

// ======================================================

export const EnderecoInputDtoValidationContract = createValidationContract(() => {
  const schema = EnderecoDtoValidationContract();

  return yup.object().shape({
    cep: getSchemaField(schema, 'cep'),

    logradouro: getSchemaField(schema, 'logradouro'),
    numero: getSchemaField(schema, 'numero'),
    bairro: getSchemaField(schema, 'bairro'),
    complemento: getSchemaField(schema, 'complemento'),
    pontoReferencia: getSchemaField(schema, 'pontoReferencia'),

    cidade: getSchemaField(schema, 'cidade'),
  });
});

// ======================================================

@InputType('EnderecoInputDto')
export class EnderecoInputDto implements IEnderecoInputDto {
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

  @DtoProperty(EnderecoDtoProperties.ENDERECO_CIDADE_INPUT)
  cidade!: IObjectId;
}
