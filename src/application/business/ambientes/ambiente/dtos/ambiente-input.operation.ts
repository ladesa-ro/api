import { InputType } from '@nestjs/graphql';
import { IAmbienteInputDto, IObjectUuid } from '@sisgea/spec';
import * as yup from 'yup';
import { DtoProperty, createValidationContract, getSchemaField } from '../../../../../infrastructure';
import { AmbienteDtoProperties, AmbienteDtoValidationContract } from './ambiente.dto';

// ======================================================

export const AmbienteInputDtoValidationContract = createValidationContract(() => {
  const schema = AmbienteDtoValidationContract();

  return yup.object().shape({
    nome: getSchemaField(schema, 'nome'),
    descricao: getSchemaField(schema, 'descricao'),
    codigo: getSchemaField(schema, 'codigo'),
    capacidade: getSchemaField(schema, 'capacidade'),
    tipo: getSchemaField(schema, 'tipo'),
  });
});

// ======================================================

@InputType('AmbienteInputDto')
export class AmbienteInputDto implements IAmbienteInputDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_NOME)
  nome!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_DESCRICAO)
  descricao!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CODIGO)
  codigo!: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CAPACIDADE)
  capacidade!: number | null;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_TIPO)
  tipo!: string | null;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_BLOCO_INPUT)
  bloco!: IObjectUuid;
}
