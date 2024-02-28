import { ObjectType } from '@nestjs/graphql';
import { IUsuarioVinculoCampusFindAllResultDto, IUsuarioVinculoCampusFindOneResultDto } from '../../../(dtos)';
import { DtoProperty, PaginatedResultDto } from '../../../../../infrastructure';
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
