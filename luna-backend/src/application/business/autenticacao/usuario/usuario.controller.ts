import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { ClientAccessHttp, DtoOperationCreate, DtoOperationDelete, DtoOperationFindAll, DtoOperationFindOne, DtoOperationUpdate, HttpDtoBody, HttpDtoParam } from '../../../../infrastructure';
import { UsuarioOperations } from './dtos/usuario.operations';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get('/')
  @DtoOperationFindAll(UsuarioOperations.USUARIO_FIND_ALL)
  async usuarioFindAll(@ClientAccessHttp() clientAccess: IClientAccess): Promise<Dto.IUsuarioFindOneResultDto[]> {
    return this.usuarioService.usuarioFindAll(clientAccess);
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(UsuarioOperations.USUARIO_FIND_ONE_BY_ID)
  async usuarioFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(UsuarioOperations.USUARIO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(UsuarioOperations.USUARIO_CREATE)
  async usuarioCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(UsuarioOperations.USUARIO_CREATE) dto: Dto.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(UsuarioOperations.USUARIO_UPDATE)
  async usuarioUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(UsuarioOperations.USUARIO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(UsuarioOperations.USUARIO_UPDATE)
    dto: Omit<Dto.IUsuarioUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IUsuarioUpdateDto = {
      ...dto,
      id,
    };

    return this.usuarioService.usuarioUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID)
  async usuarioDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioDeleteOneById(clientAccess, { id });
  }

  //
}
