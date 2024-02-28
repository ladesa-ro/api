import { ObjectType } from '@nestjs/graphql';
import { IUsuarioVinculoCampusFindAllResultDto, IUsuarioVinculoCampusFindOneResultDto, PaginatedResultDto } from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { UsuarioVinculoCampusDto } from './usuario-vinculo-campus.dto';

// ======================================================

@ObjectType('UsuarioVinculoCampusFindAllResultDto')
export class UsuarioVinculoCampusFindAllResultDto extends PaginatedResultDto<IUsuarioVinculoCampusFindOneResultDto> implements IUsuarioVinculoCampusFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca',
    nullable: false,
    gql: {
      type: () => UsuarioVinculoCampusDto,
    },
    swagger: {
      type: () => UsuarioVinculoCampusDto,
    },
  })
  data!: IUsuarioVinculoCampusFindOneResultDto[];
}

// ======================================================
