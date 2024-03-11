import { ObjectType } from '@nestjs/graphql';
import { ICampusFindOneResultDto, IUsuarioFindOneResultDto, IUsuarioVinculoCampusFindOneResultDto } from '../../../(spec)';
import { DtoProperty } from '../../../../../infrastructure';
import { UsuarioVinculoCampusDtoProperties } from './usuario-vinculo-campus.dto';

// ======================================================

@ObjectType('UsuarioVinculoCampusFindOneResultDto')
export class UsuarioVinculoCampusFindOneResultDto implements IUsuarioVinculoCampusFindOneResultDto {
  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_ID)
  id!: string;

  //

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_ATIVO)
  ativo!: boolean;

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_CARGO)
  cargo!: string;

  //

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_CAMPUS_OUTPUT)
  campus!: ICampusFindOneResultDto;

  @DtoProperty(UsuarioVinculoCampusDtoProperties.VINCULO_USUARIO_OUTPUT)
  usuario!: IUsuarioFindOneResultDto;
}

// ======================================================
