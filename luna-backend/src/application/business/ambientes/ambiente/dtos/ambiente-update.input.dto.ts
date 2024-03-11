import { InputType } from '@nestjs/graphql';
import { OmitType } from '@nestjs/swagger';
import * as yup from 'yup';
import * as Dto from '../../../(spec)';
import { DtoProperty, createValidationContract } from '../../../../../infrastructure';
import { AmbienteFindOneByIdInputValidationContract } from './ambiente-find-one-by-id.input.dto';
import { AmbienteInputDtoValidationContract } from './ambiente-input.dto';
import { AmbienteDtoProperties } from './ambiente.dto';

// ======================================================

export const AmbienteUpdateInputDtoValidationContract = createValidationContract(() => {
  return yup
    .object()
    .concat(AmbienteFindOneByIdInputValidationContract())
    .concat(AmbienteInputDtoValidationContract().partial().omit(['bloco']))
    .shape({
      bloco: yup.mixed().strip().optional().nullable(),
    });
});

// ======================================================

@InputType('AmbienteUpdateInputDto')
export class AmbienteUpdateInputDto implements Dto.IAmbienteUpdateDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;

  //

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_NOME, { required: false })
  nome?: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_DESCRICAO, { required: false })
  descricao?: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CODIGO, { required: false })
  codigo?: string;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_CAPACIDADE, { required: false })
  capacidade?: number | null;

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_TIPO, { required: false })
  tipo?: string | null;

  //
}

export class AmbienteUpdateWithoutIdInputDto extends OmitType(AmbienteUpdateInputDto, ['id'] as const) {}
