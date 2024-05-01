import { ObjectType } from '@nestjs/graphql';
import { IUsuarioVinculoCampusFindAllResultDto, IUsuarioVinculoCampusFindOneResultDto } from '@sisgea/spec';
import { DtoProperty, PaginatedResultDto } from '../../../../infraestrutura';
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
