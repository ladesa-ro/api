import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put, UploadedFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { HttpDtoBody } from '../../../legacy';
import { BlocoService } from './bloco.service';

@ApiTags('Blocos')
@Controller('/blocos')
export class BlocoController {
  constructor(private blocoService: BlocoService) {}

  //

  @Get('/')
  @Operacao(Spec.BlocoFindAllOperator())
  async blocoFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.BlocoFindAllOperator()) dto: Spec.IPaginatedInputDto): Promise<Spec.IBlocoFindAllResultDto> {
    return this.blocoService.blocoFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.BlocoFindOneByIdOperator())
  async blocoFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.BlocoFindOneByIdOperator())
    { id }: Spec.IBlocoFindOneByIdInputDto,
  ) {
    return this.blocoService.blocoFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.BlocoCreateOperator())
  async blocoCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.BlocoCreateOperator()) dto: Spec.IBlocoInputDto) {
    return this.blocoService.blocoCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.BlocoUpdateOperator())
  async blocoUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.BlocoUpdateOperator())
    { id, ...dto }: Spec.IBlocoUpdateDto,
  ) {
    const dtoUpdate: Spec.IBlocoUpdateDto = {
      ...dto,
      id,
    };

    return this.blocoService.blocoUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Get('/:id/imagem/capa')
  @Operacao(Spec.BlocoGetImagemCapaOperator())
  async blocoGetImagemCapa(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.BlocoFindOneByIdOperator())
    { id }: Spec.IBlocoFindOneByIdInputDto,
  ) {
    return this.blocoService.blocoGetImagemCapa(contextoDeAcesso, id);
  }

  @Put('/:id/imagem/capa')
  @Operacao(Spec.BlocoSetImagemCapaOperator())
  async blocoImagemCapaSave(
    //
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @Param('id', ParseUUIDPipe) id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.blocoService.blocoUpdateImagemCapa(contextoDeAcesso, { id }, file);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.BlocoDeleteOperator())
  async blocoDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.BlocoFindOneByIdOperator())
    { id }: Spec.IBlocoFindOneByIdInputDto,
  ) {
    return this.blocoService.blocoDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
