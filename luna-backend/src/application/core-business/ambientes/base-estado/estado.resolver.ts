import { Query, Resolver } from '@nestjs/graphql';
import {
  IEstadoFindOneByIdInputDto,
  IEstadoFindOneByUfInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  DtoGqlInput,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import {
  EstadoDto,
  EstadoFindOneByIdInputDto,
  EstadoFindOneByIdInputValidationContract,
  EstadoFindOneByUfInputDto,
  EstadoFindOneByUfInputValidationContract,
} from './dtos';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Query(() => [EstadoDto], {
    name: 'estadoFindAll',
    description:
      'Lista de todos os estados brasileiros cadastrados no sistema.',
  })
  async estadoFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.estadoService.findAll(requestContext);
  }

  @Query(() => EstadoDto, {
    name: 'estadoFindByUf',
    description: 'Realiza a consulta a um estado por sigla da UF.',
  })
  async estadoFindByUf(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,

    @DtoGqlInput({
      type: () => EstadoFindOneByUfInputDto,
      validationContract: EstadoFindOneByUfInputValidationContract,
    })
    dto: IEstadoFindOneByUfInputDto,
  ) {
    return this.estadoService.findByUfStrict(requestContext, dto);
  }

  @Query(() => EstadoDto, {
    name: 'estadoFindById',
    description: 'Retorna a consulta a um estado por ID IBGE.',
  })
  async estadoFindById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @DtoGqlInput({
      type: () => EstadoFindOneByIdInputDto,
      validationContract: EstadoFindOneByIdInputValidationContract,
    })
    dto: IEstadoFindOneByIdInputDto,
  ) {
    return this.estadoService.findByIdStrict(requestContext, dto);
  }
}
