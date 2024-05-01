import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta } from '@/legacy/utils/QueryBuilderViewOptionsLoad';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as Dto from '@sisgea/spec';
import { FilterOperator, PaginateQuery, paginate } from 'nestjs-paginate';
import { NotBrackets, SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { UsuarioService } from '../usuario/usuario.service';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { paginateConfig } from '../../../legacy/utils';
import { ICampusQueryBuilderViewOptions, CampusService } from '../../ambientes/campus/campus.service';

// ============================================================================

const aliasUsuarioVinculoCampus = 'vinculo';

// ============================================================================

export type IUsuarioVinculoCampusQueryBuilderViewOptions = {
  loadCampus?: IQueryBuilderViewOptionsLoad<ICampusQueryBuilderViewOptions>;
  loadUsuario?: IQueryBuilderViewOptionsLoad<unknown>;
};

// ============================================================================

@Injectable()
export class UsuarioVinculoCampusService {
  constructor(
    private databaseContext: DatabaseContextService,
    private campusService: CampusService,
    private usuarioService: UsuarioService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  get usuarioVinculoCampusRepository() {
    return this.databaseContext.usuarioVinculoCampusRepository;
  }

  //

  static UsuarioVinculoCampusQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IUsuarioVinculoCampusQueryBuilderViewOptions = {}) {
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
    const qb = this.usuarioVinculoCampusRepository.createQueryBuilder(aliasUsuarioVinculoCampus);

    UsuarioVinculoCampusService.UsuarioVinculoCampusQueryBuilderView(aliasUsuarioVinculoCampus, qb);

    await contextoDeAcesso.aplicarFiltro('vinculo:find', qb, aliasUsuarioVinculoCampus, null);

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

  async vinculoFindById(contextoDeAcesso: IContextoDeAcesso, dto: Dto.IUsuarioVinculoCampusFindOneByIdInputDto): Promise<Dto.IUsuarioVinculoCampusFindOneResultDto | null> {
    // =========================================================

    const qb = this.usuarioVinculoCampusRepository.createQueryBuilder(aliasUsuarioVinculoCampus);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('vinculo:find', qb, aliasUsuarioVinculoCampus, null);

    // =========================================================

    qb.andWhere(`${aliasUsuarioVinculoCampus}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    UsuarioVinculoCampusService.UsuarioVinculoCampusQueryBuilderView(aliasUsuarioVinculoCampus, qb, {});

    // =========================================================

    const vinculo = await qb.getOne();

    // =========================================================

    return vinculo;
  }

  async vinculoFindByIdStrict(contextoDeAcesso: IContextoDeAcesso, dto: Dto.IUsuarioVinculoCampusFindOneByIdInputDto) {
    const vinculo = await this.vinculoFindById(contextoDeAcesso, dto);

    if (!vinculo) {
      throw new NotFoundException();
    }

    return vinculo;
  }

  async vinculoSetVinculos(contextoDeAcesso: IContextoDeAcesso, dto: Dto.IUsuarioVinculoCampusSetVinculosInputDto) {
    const campus = await this.campusService.campusFindByIdSimpleStrict(contextoDeAcesso, dto.campus.id);
    const usuario = await this.usuarioService.usuarioFindByIdSimpleStrict(contextoDeAcesso, dto.usuario.id);

    const vinculosParaManter = new Set();

    for (const cargo of dto.cargos) {
      const vinculoAtualAtivo = await this.usuarioVinculoCampusRepository
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

      const vinculo = this.usuarioVinculoCampusRepository.create();

      this.usuarioVinculoCampusRepository.merge(vinculo, {
        ativo: true,
        cargo: cargo,
        usuario: {
          id: usuario.id,
        },
        campus: {
          id: campus.id,
        },
      });

      await this.usuarioVinculoCampusRepository.save(vinculo);

      vinculosParaManter.add(vinculo.id);
    }

    // DESATIVAR OUTROS VÍNCULOS
    await this.usuarioVinculoCampusRepository
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
