import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import * as Dto from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import {
  ClientAccessHttp,
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
  async modalidadeFindAll(@ClientAccessHttp() clientAccess: IClientAccess, @Paginate() query: PaginateQuery): Promise<Dto.IModalidadeFindAllResultDto> {
    return this.modalidadeService.modalidadeFindAll(clientAccess, getSearchInputFromPaginateQuery(query));
  }

  //

  @Get('/:id')
  @DtoOperationFindOne(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID)
  async modalidadeFindById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(ModalidadeOperations.MODALIDADE_FIND_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.modalidadeService.modalidadeFindByIdStrict(clientAccess, { id });
  }

  //

  @Post('/')
  @DtoOperationCreate(ModalidadeOperations.MODALIDADE_CREATE)
  async modalidadeCreate(@ClientAccessHttp() clientAccess: IClientAccess, @HttpDtoBody(ModalidadeOperations.MODALIDADE_CREATE) dto: Dto.IModalidadeInputDto) {
    return this.modalidadeService.modalidadeCreate(clientAccess, dto);
  }

  //

  @Patch('/:id')
  @DtoOperationUpdate(ModalidadeOperations.MODALIDADE_UPDATE)
  async modalidadeUpdate(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(ModalidadeOperations.MODALIDADE_UPDATE, 'id')
    id: string,
    @HttpDtoBody(ModalidadeOperations.MODALIDADE_UPDATE)
    dto: Omit<Dto.IModalidadeUpdateDto, 'id'>,
  ) {
    const dtoUpdate: Dto.IModalidadeUpdateDto = {
      ...dto,
      id,
    };

    return this.modalidadeService.modalidadeUpdate(clientAccess, dtoUpdate);
  }

  //

  @Delete('/:id')
  @DtoOperationDelete(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID)
  async modalidadeDeleteOneById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(ModalidadeOperations.MODALIDADE_DELETE_ONE_BY_ID, 'id')
    id: string,
  ) {
    return this.modalidadeService.modalidadeDeleteOneById(clientAccess, { id });
  }

  //
}
