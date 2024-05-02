import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import * as Spec from '@sisgea/spec';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { ContextoDeAcessoHttp, IContextoDeAcesso } from '../../../contexto-de-acesso';
import { HttpDtoBody, HttpDtoParam, getSearchInputFromPaginateQuery } from '../../../legacy';
import { DiarioProfessorService } from './diario-professor.service';
import { Operacao } from '../../../especificacao';

@ApiTags('DiarioProfessor')
@Controller('/diario-professor')
export class DiarioProfessorController {
  constructor(private diarioProfessorService: DiarioProfessorService) {}

  //

  @Get('/')
  @Operacao(Spec.DiarioProfessorFindAllOperator())
  async diarioProfessorFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Spec.IDiarioProfessorFindAllResultDto> {
    return this.diarioProfessorService.diarioProfessorFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @Operacao(Spec.DiarioProfessorFindOneByIdOperator())
  async diarioProfessorFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.DiarioProfessorFindOneByIdOperator(), 'id')
    id: string,
  ) {
    return this.diarioProfessorService.diarioProfessorFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @Operacao(Spec.DiarioProfessorCreateOperator())
  async diarioProfessorCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(Spec.DiarioProfessorCreateOperator()) dto: Spec.IDiarioProfessorInputDto) {
    return this.diarioProfessorService.diarioProfessorCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @Operacao(Spec.DiarioProfessorUpdateOperator())
  async diarioProfessorUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.DiarioProfessorUpdateOperator(), 'id')
    id: string,
    @HttpDtoBody(Spec.DiarioProfessorUpdateOperator())
    dto: Omit<Spec.IDiarioProfessorUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Spec.IDiarioProfessorUpdateDto = {
      ...dto,
      id,
    };

    return this.diarioProfessorService.diarioProfessorUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @Operacao(Spec.DiarioProfessorDeleteOperator())
  async diarioProfessorDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(Spec.DiarioProfessorDeleteOperator(), 'id')
    id: string,
  ) {
    return this.diarioProfessorService.diarioProfessorDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
