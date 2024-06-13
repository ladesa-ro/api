import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { CombinedInput, Operation } from '../../../helpers/ladesa';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get('/')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.List)
  async usuarioFindAll(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioListCombinedInput,
  ): Promise<LadesaTypings.UsuarioListCombinedSuccessOutput['body']> {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.FindById)
  async usuarioFindById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.Create)
  async usuarioCreate(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioCreateCombinedInput,
  ) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.Create)
  async usuarioUpdate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIDCombinedInput) {
    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dto);
  }

  //

  @Get('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.GetCoverImage)
  async usuarioGetImagemCapa(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(contextoDeAcesso, dto.params.id);
  }

  @Put('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.SetCoverImage)
  async usuarioImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Get('/:id/imagem/perfil')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.GetProfileImage)
  async usuarioGetImagemPerfil(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(contextoDeAcesso, dto.params.id);
  }

  @Put('/:id/imagem/perfil')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.SetProfileImage)
  async usuarioImagemPerfilSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemPerfil(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.DeleteById)
  async usuarioDeleteOneById(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @CombinedInput() dto: LadesaTypings.UsuarioDeleteByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, { id: dto.params.id });
  }

  //
}
