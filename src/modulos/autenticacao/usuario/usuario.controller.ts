import LadesaTypings from '@ladesa-ro/especificacao';
import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessContext, AccessContextHttp } from '../../../access-context';
import { CombinedInput, Operation } from '../../../fixtures';
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
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioListCombinedInput,
  ): Promise<LadesaTypings.UsuarioListCombinedSuccessOutput['body']> {
    return this.usuarioService.usuarioFindAll(accessContext, dto);
  }

  //

  @Get('/:id')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.FindById)
  async usuarioFindById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(accessContext, { id: dto.params.id });
  }

  //

  @Post('/')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.Create)
  async usuarioCreate(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioCreateCombinedInput,
  ) {
    return this.usuarioService.usuarioCreate(accessContext, dto);
  }

  //

  @Patch('/:id')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.Create)
  async usuarioUpdate(@AccessContextHttp() accessContext: AccessContext, @CombinedInput() dto: LadesaTypings.UsuarioUpdateByIDCombinedInput) {
    return this.usuarioService.usuarioUpdate(accessContext, dto);
  }

  //

  @Get('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.GetCoverImage)
  async usuarioGetImagemCapa(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(accessContext, dto.params.id);
  }

  @Put('/:id/imagem/capa')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.SetCoverImage)
  async usuarioImagemCapaSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemCapa(accessContext, { id }, file);
  }

  //

  @Get('/:id/imagem/perfil')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.GetProfileImage)
  async usuarioGetImagemPerfil(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioFindByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(accessContext, dto.params.id);
  }

  @Put('/:id/imagem/perfil')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.SetProfileImage)
  async usuarioImagemPerfilSave(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @UploadedFile() file: Express.Multer.File,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usuarioService.usuarioUpdateImagemPerfil(accessContext, { id }, file);
  }

  //

  @Delete('/:id')
  @Operation(LadesaTypings.Tokens.Usuario.Operations.DeleteById)
  async usuarioDeleteOneById(
    //
    @AccessContextHttp() accessContext: AccessContext,
    @CombinedInput() dto: LadesaTypings.UsuarioDeleteByIDCombinedInput,
  ) {
    return this.usuarioService.usuarioDeleteOneById(accessContext, { id: dto.params.id });
  }

  //
}
