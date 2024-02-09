import { Query, Resolver } from '@nestjs/graphql';
import {
  IBaseCidadeFindOneByIdInputDto,
  IRequestContext,
} from '../../../../domain';
import {
  GqlArgYup,
  ResolveRequestContextGraphQl,
} from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import {
  CidadeFindOneByIdInputContract,
  CidadeFindOneByIdInputDto,
  CidadeFindOneResultDto,
} from './dtos';

@Resolver()
export class CidadeResolver {
  constructor(
    //
    private cidadeService: CidadeService,
  ) {}

  @Query(() => [CidadeFindOneResultDto], {
    name: 'cidadeFindAll',
    description:
      'Lista de todas as cidades brasileiras cadastradas no sistema.',
  })
  async cidadeFindAll(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
  ) {
    return this.cidadeService.findAll(requestContext);
  }

  @Query(() => CidadeFindOneResultDto, {
    name: 'cidadeFindById',
    description: 'Retorna a consulta a uma cidade por ID IBGE.',
  })
  async cidadeFindById(
    @ResolveRequestContextGraphQl() requestContext: IRequestContext,
    @GqlArgYup('dto', CidadeFindOneByIdInputContract(), {
      type: () => CidadeFindOneByIdInputDto,
      description: 'Dados da requisição.',
    })
    dto: IBaseCidadeFindOneByIdInputDto,
  ) {
    return this.cidadeService.findByIdStrict(requestContext, dto);
  }
}
