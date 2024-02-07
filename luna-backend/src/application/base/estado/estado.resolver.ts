import { Query, Resolver } from '@nestjs/graphql';
import { EstadoFindOneResultDto } from './dtos';
import { EstadoService } from './estado.service';

@Resolver()
export class EstadoResolver {
  constructor(
    //
    private estadoService: EstadoService,
  ) {}

  @Query(() => [EstadoFindOneResultDto], {
    name: 'estadoFindAll',
    description:
      'Lista de todos os estados brasileiros cadastrados no sistema.',
  })
  async estadoFindAll() {
    return this.estadoService.findAll();
  }
}
