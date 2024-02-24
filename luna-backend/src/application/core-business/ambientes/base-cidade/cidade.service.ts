import { Injectable, NotFoundException } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { ICidadeFindOneByIdInputDto } from '../../(dtos)';
import { IClientAccess } from '../../../../domain/client-access';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '../../../utils/QueryBuilderViewOptionsLoad';
import { EstadoService, IEstadoQueryBuilderViewOptions } from '../base-estado/estado.service';

const aliasCidade = 'cidade';

export type ICidadeQueryBuilderViewOptions = {
  loadEstado?: IQueryBuilderViewOptionsLoad<IEstadoQueryBuilderViewOptions>;
};

@Injectable()
export class CidadeService {
  constructor(private databaseContextService: DatabaseContextService) {}

  //

  static CidadeQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: ICidadeQueryBuilderViewOptions = {}) {
    const loadEstado = getQueryBuilderViewLoadMeta(options.loadEstado, true, `${alias}_estado`);

    qb.addSelect([`${alias}.id`, `${alias}.nome`]);

    if (loadEstado) {
      qb.innerJoin(`${alias}.estado`, `${loadEstado.alias}`);
      EstadoService.EstadoQueryBuilderView(loadEstado.alias, qb);
    }
  }

  //

  get cidadeRepository() {
    return this.databaseContextService.baseCidadeRepository;
  }

  //

  async findAll(clientAccess: IClientAccess) {
    // =========================================================

    const qb = this.cidadeRepository.createQueryBuilder('cidade');

    // =========================================================

    await clientAccess.applyFilter('cidade:find', qb, aliasCidade, null);

    // =========================================================

    qb.select([]);

    CidadeService.CidadeQueryBuilderView(aliasCidade, qb, {
      loadEstado: { alias: 'estado' },
    });

    // =========================================================

    const cidades = await qb.getMany();

    // =========================================================

    return cidades;
  }

  async findById(clientAccess: IClientAccess, dto: ICidadeFindOneByIdInputDto) {
    // =========================================================

    const { baseCidadeRepository } = this.databaseContextService;

    // =========================================================

    const qb = baseCidadeRepository.createQueryBuilder(aliasCidade);

    // =========================================================

    await clientAccess.applyFilter('cidade:find', qb, aliasCidade, null);

    // =========================================================

    qb.andWhere('cidade.id = :id', { id: dto.id });

    // =========================================================

    qb.select([]);

    CidadeService.CidadeQueryBuilderView(aliasCidade, qb, {
      loadEstado: { alias: 'estado' },
    });

    // =========================================================

    const cidade = await qb.getOne();

    // =========================================================

    return cidade;
  }

  async findByIdStrict(clientAccess: IClientAccess, dto: ICidadeFindOneByIdInputDto) {
    const cidade = await this.findById(clientAccess, dto);

    if (!cidade) {
      throw new NotFoundException();
    }

    return cidade;
  }
}
