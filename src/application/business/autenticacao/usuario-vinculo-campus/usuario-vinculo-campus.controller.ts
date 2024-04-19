import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { ContextoDeAcessoHttp, DtoOperationFindAll, DtoOperationUpdate, HttpDtoBody } from 'infrastructure';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../../domain';
import { UsuarioVinculoCampusOperations } from './dtos';
import { UsuarioVinculoCampusService } from './usuario-vinculo-campus.service';

@Controller('/vinculos')
@ApiTags('Vinculos')
export class UsuarioVinculoCampusController {
  constructor(private usuarioVinculoCampusService: UsuarioVinculoCampusService) {}

  @Get('/')
  @DtoOperationFindAll(UsuarioVinculoCampusOperations.VINCULO_FIND_ALL)
  async findAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery) {
    return this.usuarioVinculoCampusService.vinculoFindAll(contextoDeAcesso, query);
  }

  @Post('/')
  @DtoOperationUpdate(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS)
  async vinculoSetVinculos(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoBody(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS) dto: Dto.IUsuarioVinculoCampusSetVinculosInputDto,
  ) {
    return this.usuarioVinculoCampusService.vinculoSetVinculos(contextoDeAcesso, dto);
  }
}
