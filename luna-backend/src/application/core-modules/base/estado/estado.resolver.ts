import { Query, Resolver } from '@nestjs/graphql';
import {
  IBaseEstadoFindOneByIdInputDto,
  IBaseEstadoFindOneByUfInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  GqlArgYup,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import {
  EstadoFindOneByIdInputContract,
  EstadoFindOneByIdInputDto,
  EstadoFindOneByUfInputContract,
  EstadoFindOneByUfInputDto,
  EstadoFindOneResultDto,
} from './dtos';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Query(() => [EstadoFindOneResultDto], {
    name: 'estadoFindAll',
    description:
      'Lista de todos os estados brasileiros cadastrados no sistema.',
  })
  async estadoFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.estadoService.findAll(requestContext);
  }

  @Query(() => EstadoFindOneResultDto, {
    name: 'estadoFindByUf',
    description: 'Realiza a consulta a um estado por sigla da UF.',
  })
  async estadoFindByUf(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,

    @GqlArgYup('dto', EstadoFindOneByUfInputContract(), {
      type: () => EstadoFindOneByUfInputDto,
      description: 'Dados da requisição.',
    })
    dto: IBaseEstadoFindOneByUfInputDto,
  ) {
    return this.estadoService.findByUfStrict(requestContext, dto);
  }

  @Query(() => EstadoFindOneResultDto, {
    name: 'estadoFindById',
    description: 'Retorna a consulta a um estado por ID IBGE.',
  })
  async estadoFindById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @GqlArgYup('dto', EstadoFindOneByIdInputContract(), {
      type: () => EstadoFindOneByIdInputDto,
      description: 'Dados da requisição.',
    })
    dto: IBaseEstadoFindOneByIdInputDto,
  ) {
    return this.estadoService.findByIdStrict(requestContext, dto);
  }
}
