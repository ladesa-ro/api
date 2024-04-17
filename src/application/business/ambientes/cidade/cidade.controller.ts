import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain/contexto-de-acesso';
import { ContextoDeAcessoHttp, DtoOperationFindAll, DtoOperationFindOne, HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import { CidadeOperations } from './dtos';

@ApiTags('Cidades')
@Controller('/base/cidades')
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  // ========================================================

  @Get('/')
  @DtoOperationFindAll(CidadeOperations.CIDADE_FIND_ALL)
  async findAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.ICidadeFindAllResultDto> {
    return this.cidadeService.findAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  // ========================================================

  @Get('/:id')
  @DtoOperationFindOne(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async findById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(CidadeOperations.CIDADE_FIND_ONE_BY_ID, 'id')
    id: number,
  ): Promise<Dto.ICidadeFindOneResultDto> {
    return this.cidadeService.findByIdStrict(contextoDeAcesso, { id });
  }
}
