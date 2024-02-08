import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IBaseEstadoFindOneByIdInputDto,
  IBaseEstadoFindOneByUfInputDto,
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
    qb.select('estado');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');
    const estados = await qb.getMany();

    // =========================================================

    return estados;
  }

  async findByUf(
    requestContext: IRequestContext,
    dto: IBaseEstadoFindOneByUfInputDto,
  ) {
    // =========================================================

    const { baseEstadoRepository } = this.databaseContext;

    // =========================================================

    const qb = baseEstadoRepository.createQueryBuilder('estado');
    qb.select('estado');

    // =========================================================

    qb.where('estado.sigla = :sigla', { sigla: dto.uf.toUpperCase() });

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');
    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByUfStrict(
    requestContext: IRequestContext,
    dto: IBaseEstadoFindOneByUfInputDto,
  ) {
    const estado = await this.findByUf(requestContext, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }

  async findById(
    requestContext: IRequestContext,
    dto: IBaseEstadoFindOneByIdInputDto,
  ) {
    // =========================================================

    const { baseEstadoRepository } = this.databaseContext;

    // =========================================================

    const qb = baseEstadoRepository.createQueryBuilder('estado');
    qb.select('estado');

    // =========================================================

    qb.where('estado.id = :id', { id: dto.id });

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');
    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(
    requestContext: IRequestContext,
    dto: IBaseEstadoFindOneByIdInputDto,
  ) {
    const estado = await this.findById(requestContext, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
