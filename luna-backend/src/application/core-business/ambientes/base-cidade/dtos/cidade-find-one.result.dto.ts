import { ICidadeFindOneResultDto } from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { CidadeDtoProperties } from './cidade.dto';

// ======================================================

export class CidadeFindOneResultDto implements ICidadeFindOneResultDto {
  @DtoProperty(CidadeDtoProperties.CIDADE_ID)
  id!: number;

  @DtoProperty(CidadeDtoProperties.CIDADE_NOME)
  nome!: string;
}

// ======================================================
