import { ObjectType } from '@nestjs/graphql';
import { IAmbienteFindOneResultDto, IBlocoFindOneResultDto } from '../../../(spec)';
import { DtoProperty } from '../../../../../infrastructure';
import { AmbienteDtoProperties } from './ambiente.dto';

// ======================================================

@ObjectType('AmbienteFindOneResultDto')
export class AmbienteFindOneResultDto implements IAmbienteFindOneResultDto {
  @DtoProperty(AmbienteDtoProperties.AMBIENTE_ID)
  id!: string;

  //

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

  //

  @DtoProperty(AmbienteDtoProperties.AMBIENTE_BLOCO_OUTPUT)
  bloco!: IBlocoFindOneResultDto;
}

// ======================================================
