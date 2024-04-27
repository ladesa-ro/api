import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Dto from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { IContextoDeAcesso } from '../../../../domain';
import {
  ContextoDeAcessoHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationGetFile,
  DtoOperationSaveFile,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infrastructure';
import { UsuarioOperations } from './usuario.dtos';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get('/')
  @DtoOperationFindAll(UsuarioOperations.USUARIO_FIND_ALL)
  async usuarioFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IUsuarioFindAllResultDto> {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(UsuarioOperations.USUARIO_FIND_ONE_BY_ID)
  async usuarioFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(UsuarioOperations.USUARIO_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(UsuarioOperations.USUARIO_CREATE)
  async usuarioCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(UsuarioOperations.USUARIO_CREATE) dto: Dto.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(UsuarioOperations.USUARIO_UPDATE)
  async usuarioUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(UsuarioOperations.USUARIO_UPDATE, 'id')
    id: string,
    @HttpDtoBody(UsuarioOperations.USUARIO_UPDATE)
    dto: Omit<Dto.IUsuarioUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IUsuarioUpdateDto = {
      ...dto,
      id,
    };

    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @DtoOperationGetFile(UsuarioOperations.USUARIO_GET_IMAGEM_CAPA)
  async usuarioGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(UsuarioOperations.USUARIO_GET_IMAGEM_CAPA, 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @DtoOperationSaveFile()
  async usuarioImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.usuarioUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Get('/:id/imagem/perfil')
  @DtoOperationGetFile(UsuarioOperations.USUARIO_GET_IMAGEM_PERFIL)
  async usuarioGetImagemPerfil(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(UsuarioOperations.USUARIO_GET_IMAGEM_PERFIL, 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/perfil')
  @DtoOperationSaveFile()
  async usuarioImagemPerfilSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usuarioService.usuarioUpdateImagemPerfil(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID)
  async usuarioDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(UsuarioOperations.USUARIO_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
