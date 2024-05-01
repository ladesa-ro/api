import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DtoOperationFindAll, DtoOperationFindOne, HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../legacy';
import { CidadeService } from './cidade.service';
import { CidadeOperations } from './dtos';

@ApiTags('Cidades')
@Controller('/base/cidades')
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get('/')
  @DtoOperationFindAll(CidadeOperations.CIDADE_FIND_ALL)
  async findAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Spec.ICidadeFindAllResultDto> {
    return this.cidadeService.findAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  // ========================================================

  @Get('/:id')
  @DtoOperationFindOne(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async findById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CidadeOperations.CIDADE_FIND_ONE_BY_ID, 'id')
    id: number,
  ): Promise<Spec.ICidadeFindOneResultDto> {
    return this.cidadeService.findByIdStrict(contextoDeAcesso, { id });
  }
}
