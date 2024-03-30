import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import * as Dto from '../../(spec)';
import { IContextoDeAcesso } from '../../../../domain';
import {
  ContextoDeAcessoHttp,
  DtoOperationCreate,
  DtoOperationDelete,
  DtoOperationFindAll,
  DtoOperationFindOne,
  DtoOperationGetFile,
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
} from '../../../../infrastructure';
import { UsuarioOperations } from './dtos/usuario.operations';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get('/')
  @DtoOperationFindAll(UsuarioOperations.USUARIO_FIND_ALL)
  async usuarioFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso): Promise<Dto.IUsuarioFindOneResultDto[]> {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso);
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
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
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          nullable: false,
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        files: 1,
        fileSize: 10 * 1024 * 1024,
      },
    }),
  )
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
