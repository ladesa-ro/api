import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ICidadeFindOneResultDto } from '../../(dtos)';
import { ClientAccessHttp, DtoOperationFindAll, DtoOperationFindOne, HttpDtoParam } from '../../../../infrastructure';
import { CidadeService } from './cidade.service';
import { CidadeOperations } from './dtos';
import { IClientAccess } from '../../../../domain/client-access';

@ApiTags('ambientes')
@Controller('/base/cidades')
export class CidadeController {
  constructor(private cidadeService: CidadeService) {}

  @Get('/')
  @DtoOperationFindAll(CidadeOperations.CIDADE_FIND_ALL)
  async findAll(@ClientAccessHttp() clientAccess: IClientAccess): Promise<ICidadeFindOneResultDto[]> {
    return this.cidadeService.findAll(clientAccess);
  }

  @Get('/:id')
  @DtoOperationFindOne(CidadeOperations.CIDADE_FIND_ONE_BY_ID)
  async findById(
    @ClientAccessHttp() clientAccess: IClientAccess,
    @HttpDtoParam(CidadeOperations.CIDADE_FIND_ONE_BY_ID, 'id')
    id: number,
  ) {
    return this.cidadeService.findByIdStrict(clientAccess, { id });
  }
}
