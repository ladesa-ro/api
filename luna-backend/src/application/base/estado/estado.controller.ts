import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IBaseEstadoFindOneResultDto } from '../../../domain';
import { EstadoFindOneResultDto } from './dtos';
import { EstadoService } from './estado.service';

@ApiTags('ambientes')
@Controller('/base/estados')
export class EstadoController {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Get('/')
  @ApiResponse({
    status: 200,
    type: [EstadoFindOneResultDto],
    description:
      'Lista de todos os estados brasileiros cadastrados no sistema.',
  })
  async findAll(): Promise<IBaseEstadoFindOneResultDto[]> {
    return this.estadoService.findAll();
  }
}
