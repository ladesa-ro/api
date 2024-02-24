import { Injectable, NotFoundException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { IEstadoFindOneByIdInputDto, IEstadoFindOneByUfInputDto } from '../../(dtos)';
import { IClientAccess } from '../../../../domain';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';

export interface IEstadoQueryBuilderViewOptions {}

const aliasEstado = 'estado';

@Injectable()
export class EstadoService {
  constructor(private databaseContext: DatabaseContextService) {}

  get baseEstadoRepository() {
    return this.databaseContext.baseEstadoRepository;
  }

  //

  static EstadoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>) {
    qb.addSelect([`${alias}.id`, `${alias}.nome`, `${alias}.sigla`]);
  }

  //

  async findAll(clienteAccess: IClientAccess) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.applyFilter('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.select([]);
    EstadoService.EstadoQueryBuilderView(aliasEstado, qb);

    // =========================================================

    const estados = await qb.getMany();

    // =========================================================

    return estados;
  }

  async findByUf(clienteAccess: IClientAccess, dto: IEstadoFindOneByUfInputDto) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder(aliasEstado);

    // =========================================================

    await clienteAccess.applyFilter('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.sigla = :sigla`, { sigla: dto.uf.toUpperCase() });

    // =========================================================

    qb.select([]);
    EstadoService.EstadoQueryBuilderView(aliasEstado, qb);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByUfStrict(clienteAccess: IClientAccess, dto: IEstadoFindOneByUfInputDto) {
    const estado = await this.findByUf(clienteAccess, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }

  async findById(clienteAccess: IClientAccess, dto: IEstadoFindOneByIdInputDto) {
    // =========================================================

    const qb = this.baseEstadoRepository.createQueryBuilder('estado');

    // =========================================================

    await clienteAccess.applyFilter('estado:find', qb, aliasEstado, null);

    // =========================================================

    qb.andWhere(`${aliasEstado}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);
    EstadoService.EstadoQueryBuilderView(aliasEstado, qb);

    // =========================================================

    const estado = await qb.getOne();

    // =========================================================

    return estado;
  }

  async findByIdStrict(clienteAccess: IClientAccess, dto: IEstadoFindOneByIdInputDto) {
    const estado = await this.findById(clienteAccess, dto);

    if (!estado) {
      throw new NotFoundException();
    }

    return estado;
  }
}
