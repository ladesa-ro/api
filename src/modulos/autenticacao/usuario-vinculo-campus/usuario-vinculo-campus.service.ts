import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '@/legacy/utils/QueryBuilderViewOptionsLoad';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dto from '@sisgea/spec';
import { FilterOperator, PaginateQuery, paginate } from 'nestjs-paginate';
import { NotBrackets, SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { paginateConfig } from '../../../legacy/utils';
import { CampusService, ICampusQueryBuilderViewOptions } from '../../ambientes/campus/campus.service';
import { UsuarioService } from '../usuario/usuario.service';

// ============================================================================

const aliasVinculo = 'vinculo';

// ============================================================================

export type IVinculoQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
  loadUsuario?: IQueryBuilderViewOptionsLoad<unknown>;
};

// ============================================================================

@Injectable()
export class VinculoService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  get vinculoRepository() {
    return this.databaseContext.vinculoRepository;
  }

  //

  static VinculoQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IVinculoQueryBuilderViewOptions = {}) {
    const loadCampus = getQueryBuilderViewLoadMeta(options.loadCampus, true, `${alias}_c`);
    const loadUsuario = getQueryBuilderViewLoadMeta(options.loadUsuario, true, `${alias}_u`);

    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.ativo`,
      `${alias}.cargo`,
    ]);

    if (loadUsuario) {
      qb.innerJoin(`${alias}.usuario`, `${loadUsuario.alias}`);
      UsuarioService.UsuarioQueryBuilderView(loadUsuario.alias, qb);
    }

    if (loadCampus) {
      qb.innerJoin(`${alias}.campus`, `${loadCampus.alias}`);
      CampusService.CampusQueryBuilderView(loadCampus.alias, qb, loadCampus.options);
    }
  }

  //

  async vinculoFindAll(contextoDeAcesso: IContextoDeAcesso, query: PaginateQuery = { path: '' }) {
    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    VinculoService.VinculoQueryBuilderView(aliasVinculo, qb);

    await contextoDeAcesso.aplicarFiltro('vinculo:find', qb, aliasVinculo, null);

    return paginate(query, qb, {
      ...paginateConfig,

      relations: {
        campus: true,
        usuario: true,
      },

      select: [
        'id',
        'ativo',
        'cargo',
        'campus.id',
        'campus.nomeFantasia',
        'campus.razaoSocial',
        'campus.apelido',
        'campus.cnpj',
        'usuario.id',
        'usuario.matriculaSiape',
        'usuario.email',
        'dateCreated',
      ],

      searchableColumns: ['cargo'],

      filterableColumns: {
        ativo: [FilterOperator.EQ],
        cargo: [FilterOperator.EQ],
        'campus.id': [FilterOperator.EQ],
        'usuario.id': [FilterOperator.EQ],
      },
    });
  }

  async vinculoFindById(contextoDeAcesso: IContextoDeAcesso, dto: Dto.IVinculoFindOneByIdInputDto): Promise<Dto.IVinculoFindOneResultDto | null> {
    // =========================================================

    const qb = this.vinculoRepository.createQueryBuilder(aliasVinculo);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('vinculo:find', qb, aliasVinculo, null);

    // =========================================================

    qb.andWhere(`${aliasVinculo}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    VinculoService.VinculoQueryBuilderView(aliasVinculo, qb, {});

    // =========================================================

    const vinculo = await qb.getOne();

    // =========================================================

    return vinculo;
  }

  async vinculoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dto.IVinculoFindOneByIdInputDto) {
    const vinculo = await this.vinculoFindById(contextoDeAcesso, dto);

    if (!vinculo) {
      throw new NotFoundException();
    }

    return vinculo;
  }

  async vinculoSetVinculos(contextoDeAcesso: IContextoDeAcesso, dto: Dto.VinculoUpdateInputDto) {
    const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.campus.id);
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(contextoDeAcesso, dto.usuario.id);

    const vinculosParaManter = new Set();

    for (const cargo of dto.cargos) {
      const vinculoAtualAtivo = await this.vinculoRepository
        .createQueryBuilder('vinculo')
        .innerJoin('vinculo.campus', 'campus')
        .innerJoin('vinculo.usuario', 'usuario')
        .andWhere('vinculo.ativo = TRUE')
        .andWhere('vinculo.dateDeleted IS NULL')
        .andWhere('campus.id = :campusId', { campusId: campus.id })
        .andWhere('usuario.id = :usuarioId', { usuarioId: usuario.id })
        .andWhere('vinculo.cargo = :cargo', { cargo: cargo })
        .getOne();

      if (vinculoAtualAtivo) {
        vinculosParaManter.add(vinculoAtualAtivo.id);
        continue;
      }

      const vinculo = this.vinculoRepository.create();

      this.vinculoRepository.merge(vinculo, {
        ativo: true,
        cargo: cargo,
        usuario: {
          id: usuario.id,
        },
        campus: {
          id: campus.id,
        },
      });

      await this.vinculoRepository.save(vinculo);

      vinculosParaManter.add(vinculo.id);
    }

    // DESATIVAR OUTROS VÍNCULOS
    await this.vinculoRepository
      .createQueryBuilder('usuario_vinculo_campus')
      .update()
      .set({
        ativo: false,
      })
      .where('ativo = :isActive', { isActive: true })
      .andWhere(new NotBrackets((qb) => qb.whereInIds([...vinculosParaManter])))
      .execute();

    return this.vinculoFindAll(contextoDeAcesso, {
      path: '/vinculos',
      filter: {
        ativo: 'true',
        'usuario.id': `${usuario.id}`,
        'campus.id': `${campus.id}`,
      },
    });
  }
}
