import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(dtos)';
import { DtoProperty } from '../../../../../infrastructure';
import { EstadoFindOneResultDto } from './estado-find-one.result.dto';
import { EstadoDto } from './estado.dto';

// ======================================================

@ObjectType('EstadoFindAllResult')
export class EstadoFindAllResultDto extends Dto.PaginatedResultDto<Dto.IEstadoFindOneResultDto> implements Dto.IEstadoFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [EstadoDto],
    },
    swagger: {
      type: [EstadoFindOneResultDto],
    },
  })
  data!: Dto.IEstadoFindOneResultDto[];
}

// ======================================================
