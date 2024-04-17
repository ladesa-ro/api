import { ObjectType } from '@nestjs/graphql';
import * as Dto from '../../../(spec)';
import { DtoProperty, PaginatedResultDto, SearchInputDto, SearchInputValidationContract, createDtoOperationOptions } from '../../../../../infrastructure';
import { ReservaDto } from './reserva.dto';
import { ReservaFindOneResultDto } from './reserva-find-one.operation';

// ======================================================

@ObjectType('ReservaFindAllResult')
export class ReservaFindAllResultDto extends PaginatedResultDto<Dto.IReservaFindOneResultDto> implements Dto.IReservaFindAllResultDto {
  @DtoProperty({
    description: 'Resultados da busca.',
    nullable: false,
    gql: {
      type: () => [ReservaDto],
    },
    swagger: {
      type: [ReservaFindOneResultDto],
    },
  })
  data!: Dto.IReservaFindOneResultDto[];
}

// =============================================================

export const RESERVA_FIND_ALL = createDtoOperationOptions({
  description: 'Lista de "reserva" cadastrados no sistema.',

  gql: {
    name: 'reservaFindAll',
    returnType: () => ReservaFindAllResultDto,

    inputNullable: true,
    inputDtoType: () => SearchInputDto,
    inputDtoValidationContract: SearchInputValidationContract,
  },

  swagger: {
    returnType: ReservaFindAllResultDto,

    queries: [
      //
      'page',
      'limit',
      'search',
      'sortBy',
      //
    ],
  },
});

// ======================================================
