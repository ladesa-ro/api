import { Injectable, NotFoundException } from '@nestjs/common';
import {
  IBaseCidadeFindOneByIdInputDto,
  IRequestContext,
} from '../../../../domain';
import { DatabaseContext } from '../../../../infrastructure/integrate-database/typeorm/database-context/database-context';

@Injectable()
export class CidadeService {
  constructor(
    //
    private databaseContext: DatabaseContext,
  ) {}

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

    qb.select('cidade');
    const cidades = await qb.getMany();

    // =========================================================

    return cidades;
  }

  async findById(
    requestContext: IRequestContext,
    dto: IBaseCidadeFindOneByIdInputDto,
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

    qb.select('cidade');
    const cidade = await qb.getOne();

    // =========================================================

    return cidade;
  }

  async findByIdStrict(
    requestContext: IRequestContext,
    dto: IBaseCidadeFindOneByIdInputDto,
  ) {
    const cidade = await this.findById(requestContext, dto);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
