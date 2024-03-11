import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientAccessHttp, DtoOperationFindAll, DtoOperationUpdate, HttpDtoBody } from 'infrastructure';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { UsuarioVinculoCampusOperations } from './dtos';
import { UsuarioVinculoCampusService } from './usuario-vinculo-campus.service';

@Controller('/vinculos')
@ApiTags('Vinculos')
export class UsuarioVinculoCampusController {
  constructor(private usuarioVinculoCampusService: UsuarioVinculoCampusService) {}

  @Get('/')
  @DtoOperationFindAll(UsuarioVinculoCampusOperations.VINCULO_FIND_ALL)
  async findAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery) {
    return this.usuarioVinculoCampusService.vinculoFindAll(clientAccess, query);
  }

  @Post('/')
  @DtoOperationUpdate(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS)
  async vinculoSetVinculos(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(UsuarioVinculoCampusOperations.VINCULO_SET_VINCULOS) dto: Dto.IUsuarioVinculoCampusSetVinculosInputDto) {
    return this.usuarioVinculoCampusService.vinculoSetVinculos(clientAccess, dto);
  }
}
