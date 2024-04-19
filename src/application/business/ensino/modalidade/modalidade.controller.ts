import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
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
  DtoOperationUpdate,
  HttpDtoBody,
  HttpDtoParam,
  getSearchInputFromPaginateQuery,
} from '../../../../infrastructure';
import { ModalidadeOperations } from './dtos';
import { ModalidadeService } from './modalidade.service';

@ApiTags('Modalidades')
@Controller('/modalidades')
export class ModalidadeController {
  constructor(private modalidadeService: ModalidadeService) {}

  //

  @Get('/')
  @DtoOperationFindAll(ModalidadeOperations.MODALIDADE_FIND_ALL)
  async modalidadeFindAll(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @Paginate() query: PaginateQuery): Promise<Dto.IModalidadeFindAllResultDto> {
    return this.modalidadeService.modalidadeFindAll(contextoDeAcesso, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
  async modalidadeFindById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(contextoDeAcesso, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(ModalidadeOperations.MODALIDADE_CREATE)
  async modalidadeCreate(@ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso, @HttpDtoBody(ModalidadeOperations.MODALIDADE_CREATE) dto: Dto.IModalidadeInputDto) {
    return this.modalidadeService.modalidadeCreate(contextoDeAcesso, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(ModalidadeOperations.MODALIDADE_UPDATE)
  async modalidadeUpdate(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ModalidadeOperations.MODALIDADE_UPDATE, 'id')
    id: string,
    @HttpDtoBody(ModalidadeOperations.MODALIDADE_UPDATE)
    dto: Omit<Dto.IModalidadeUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IModalidadeUpdateDto = {
      ...dto,
      id,
    };

    return this.modalidadeService.modalidadeUpdate(contextoDeAcesso, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID)
  async modalidadeDeleteOneById(
    @ContextoDeAcessoHttp() contextoDeAcesso: IContextoDeAcesso,
    @HttpDtoParam(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(contextoDeAcesso, { id });
  }

  //
}
