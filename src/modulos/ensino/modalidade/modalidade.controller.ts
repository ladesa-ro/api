import { Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DadosEntradaHttp, Operacao } from '../../../especificacao';
import { ModalidadeService } from './modalidade.service';

@ApiTags('Modalidades')
@Controller('/modalidades')
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  //

  @Get('/')
  @Operacao(Spec.ModalidadeFindAllOperator())
  async modalidadeFindAll(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.ModalidadeFindAllOperator()) dto: Spec.IPaginatedInputDto,
  ): Promise<Spec.IModalidadeFindAllResultDto> {
    return this.modalidadeService.modalidadeFindAll(contextoDeAcesso, dto);
  }

  //

  @Get('/:id')
  @Operacao(Spec.ModalidadeFindOneByIdOperator())
  async modalidadeFindById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.ModalidadeCreateOperator())
  async modalidadeCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @DadosEntradaHttp(Spec.ModalidadeCreateOperator()) dto: Spec.IModalidadeInputDto) {
    return this.modalidadeService.modalidadeCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.ModalidadeUpdateOperator())
  async modalidadeUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @DadosEntradaHttp(Spec.ModalidadeUpdateOperator())
    { ...dto }: Spec.IModalidadeUpdateDto,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const dtoUpdate: Spec.IModalidadeUpdateDto = {
      ...dto,
      id,
    };

    return this.modalidadeService.modalidadeUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.ModalidadeDeleteOperator())
  async modalidadeDeleteOneById(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Param('id', ParseUUIDPipe) id: string) {
    return this.modalidadeService.modalidadeDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
