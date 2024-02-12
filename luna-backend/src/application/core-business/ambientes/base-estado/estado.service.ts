import { Injectable, NotFoundException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import {
  IEstadoFindOneByIdInputDto,
  IEstadoFindOneByUfInputDto,
  IRequestContext,
} from '../../../../domain';
import { DatabaseContext } from '../../../../infrastructure/integrate-database/typeorm/database-context/database-context';

@Injectable()
export class EstadoService {
  constructor(private databaseContext: DatabaseContext) {}

  get baseEstadoRepository() {
    return this.databaseContext.baseEstadoRepository;
  }

  //

  static estadoSelectFindOne(qb: SelectQueryBuilder<any>) {
    qb.addSelect(['estado.id', 'estado.nome', 'estado.sigla']);
  }

  //

  async findAll(requestContext: IRequestContext) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');

    // =========================================================

    EstadoService.estadoSelectFindOne(qb);
    const estados = await qb.getMany();

    // =========================================================

    return estados;
  }

  async findByUf(
    requestContext: IRequestContext,
    dto: IEstadoFindOneByUfInputDto,
  ) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');

    // =========================================================

    qb.andWhere('estado.sigla = :sigla', { sigla: dto.uf.toUpperCase() });

    // =========================================================

    EstadoService.estadoSelectFindOne(qb);
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

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'estado');

    // =========================================================

    qb.andWhere('estado.id = :id', { id: dto.id });

    // =========================================================

    EstadoService.estadoSelectFindOne(qb);
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
