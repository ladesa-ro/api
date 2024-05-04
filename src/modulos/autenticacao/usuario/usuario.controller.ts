import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody, HttpDtoParam } from '../../../legacy';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  //

  @Get('/')
  @Operacao(Spec.UsuarioFindAllOperator())
  async usuarioFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.UsuarioFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.IUsuarioFindAllResultDto> {
    return this.usuarioService.usuarioFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.UsuarioFindOneByIdOperator())
  async usuarioFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.UsuarioFindOneByIdOperator(), 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.UsuarioCreateOperator())
  async usuarioCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.UsuarioCreateOperator()) dto: Spec.IUsuarioInputDto) {
    return this.usuarioService.usuarioCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.UsuarioUpdateOperator())
  async usuarioUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,

    @HttpDtoParam(Spec.UsuarioUpdateOperator(), 'id')
    id: string,

    @HttpDtoBody(Spec.UsuarioUpdateOperator())
    dto: Omit<Spec.IUsuarioUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Spec.IUsuarioUpdateDto = {
      ...dto,
      id,
    };

    return this.usuarioService.usuarioUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @Operacao(Spec.UsuarioGetImagemCapaOperator())
  async usuarioGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.UsuarioGetImagemCapaOperator(), 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operacao(Spec.UsuarioSetImagemCapaOperator())
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
  @Operacao(Spec.UsuarioGetImagemPerfilOperator())
  async usuarioGetImagemPerfil(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.UsuarioGetImagemPerfilOperator(), 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioGetImagemPerfil(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/perfil')
  @Operacao(Spec.UsuarioSetImagemPerfilOperator())
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
  @Operacao(Spec.UsuarioDeleteOperator())
  async usuarioDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.UsuarioDeleteOperator(), 'id')
    id: string,
  ) {
    return this.usuarioService.usuarioDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
