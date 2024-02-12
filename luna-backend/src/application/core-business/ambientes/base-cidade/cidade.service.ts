import { Injectable, NotFoundException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import {
  ICidadeFindOneByIdInputDto,
  IRequestContext,
} from '../../../../domain';
import { DatabaseContext } from '../../../../infrastructure/integrate-database/typeorm/database-context/database-context';
import { EstadoService } from '../base-estado/estado.service';

@Injectable()
export class CidadeService {
  constructor(
    //
    private databaseContext: DatabaseContext,
  ) {}

  //

  static cidadeSelectFindOne(qb: SelectQueryBuilder<any>, loadEstado = true) {
    qb.addSelect(['cidade.id', 'cidade.nome']);

    if (loadEstado) {
      qb.innerJoin('cidade.estado', 'estado');
      EstadoService.estadoSelectFindOne(qb);
    }
  }

  //

  async findAll(requestContext: IRequestContext) {
    // =========================================================

    const { baseCidadeRepository } = this.databaseContext;

    // =========================================================

    const qb = baseCidadeRepository.createQueryBuilder('cidade');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'cidade');

    // =========================================================

    // =========================================================

    qb.select([]);
    CidadeService.cidadeSelectFindOne(qb, true);
    const cidades = await qb.getMany();

    // =========================================================

    return cidades;
  }

  async findById(
    requestContext: IRequestContext,
    dto: ICidadeFindOneByIdInputDto,
  ) {
    // =========================================================

    const { baseCidadeRepository } = this.databaseContext;

    // =========================================================

    const qb = baseCidadeRepository.createQueryBuilder('cidade');

    // =========================================================

    requestContext.authz.applyFindFilter(qb, 'cidade');

    // =========================================================

    qb.andWhere('cidade.id = :id', { id: dto.id });

    // =========================================================

    qb.select([]);
    CidadeService.cidadeSelectFindOne(qb, true);
    const cidade = await qb.getOne();

    // =========================================================

    return cidade;
  }

  async findByIdStrict(
    requestContext: IRequestContext,
    dto: ICidadeFindOneByIdInputDto,
  ) {
    const cidade = await this.findById(requestContext, dto);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
