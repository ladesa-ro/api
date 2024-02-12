import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IEstadoFindOneByIdInputDto,
  IEstadoFindOneByUfInputDto,
  IRequestContext,
} from '../../../../domain';
import { DatabaseContext } from '../../../../infrastructure/integrate-database/typeorm/database-context/database-context';

@Injectable()
export class EstadoService {
  constructor(
    //
    private databaseContext: DatabaseContext,
  ) {}

  //

  async findAll(requestContext: IRequestContext) {
    // =========================================================

    const { baseEstadoRepository } = this.databaseContext;

    // =========================================================

    const qb = baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');

    // =========================================================

    qb.select(['estado.id', 'estado.nome', 'estado.sigla']);
    const estados = await qb.getMany();

    // =========================================================

    return estados;
  }

  async findByUf(
    requestContext: IRequestContext,
    dto: IEstadoFindOneByUfInputDto,
  ) {
    // =========================================================

    const { baseEstadoRepository } = this.databaseContext;

    // =========================================================

    const qb = baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');

    // =========================================================

    qb.andWhere('estado.sigla = :sigla', { sigla: dto.uf.toUpperCase() });

    // =========================================================

    qb.select(['estado.id', 'estado.nome', 'estado.sigla']);
    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByUfStrict(
    requestContext: IRequestContext,
    dto: IEstadoFindOneByUfInputDto,
  ) {
    const estado = await this.findByUf(requestContext, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }

  async findById(
    requestContext: IRequestContext,
    dto: IEstadoFindOneByIdInputDto,
  ) {
    // =========================================================

    const { baseEstadoRepository } = this.databaseContext;

    // =========================================================

    const qb = baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');

    // =========================================================

    qb.andWhere('estado.id = :id', { id: dto.id });

    // =========================================================

    qb.select(['estado.id', 'estado.nome', 'estado.sigla']);
    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(
    requestContext: IRequestContext,
    dto: IEstadoFindOneByIdInputDto,
  ) {
    const estado = await this.findById(requestContext, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
