import { AppResource, AppResourceView } from '@/legacy/utils/qbEfficientLoad';
import { Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import * as Spec from '@sisgea/spec';
import { has, map, pick } from 'lodash';
import { paginate } from 'nestjs-paginate';
import { SelectQueryBuilder } from 'typeorm';
import { IContextoDeAcesso } from '../../../contexto-de-acesso';
import { DatabaseContextService } from '../../../integracao-banco-de-dados';
import { UsuarioEntity } from '../../../integracao-banco-de-dados/typeorm/entities';
import { KeycloakService } from '../../../integracao-identidade-e-acesso';
import { getPaginateQueryFromSearchInput, getPaginatedResultDto } from '../../../legacy';
import { IQueryBuilderViewOptionsLoad, getQueryBuilderViewLoadMeta, paginateConfig } from '../../../legacy/utils';
import { ValidationFailedException } from '../../../nest-app';
import { ArquivoService } from '../../base/arquivo/arquivo.service';
import { IImagemQueryBuilderViewOptions, ImagemService } from '../../base/imagem/imagem.service';

// ============================================================================

const aliasUsuario = 'usuario';

// ============================================================================

export type IUsuarioQueryBuilderViewOptions = {
  loadImagemCapa?: IQueryBuilderViewOptionsLoad<IImagemQueryBuilderViewOptions>;
  loadImagemPerfil?: IQueryBuilderViewOptionsLoad<IImagemQueryBuilderViewOptions>;
};

// ============================================================================

@Injectable()
export class UsuarioService {
  constructor(
    private keycloakService: KeycloakService,
    private databaseContext: DatabaseContextService,
    private imagemService: ImagemService,
    private arquivoService: ArquivoService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  //

  static UsuarioQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>, options: IUsuarioQueryBuilderViewOptions = {}) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.matriculaSiape`,
      `${alias}.email`,
    ]);

    qb.leftJoinAndMapMany(`${alias}.vinculosAtivos`, `${alias}.vinculos`, `${alias}_vinculo`, `${alias}_vinculo.ativo = TRUE`);
    qb.expressionMap.selects.splice(qb.expressionMap.selects.length - 1, 1);

    qb.leftJoin(`${alias}_vinculo.campus`, `${alias}_vinculo_campus`);

    qb.addSelect([
      //
      `${alias}_vinculo.id`,
      `${alias}_vinculo.ativo`,
      `${alias}_vinculo.cargo`,
      //
      `${alias}_vinculo_campus.id`,
      `${alias}_vinculo_campus.apelido`,
      `${alias}_vinculo_campus.nomeFantasia`,
      `${alias}_vinculo_campus.razaoSocial`,
    ]);

    const loadImagemCapa = getQueryBuilderViewLoadMeta(options.loadImagemCapa, true, `${alias}_imagemCapa`);

    if (loadImagemCapa) {
      qb.leftJoin(`${alias}.imagemCapa`, `${loadImagemCapa.alias}`);
      AppResourceView(AppResource.IMAGEM, qb, loadImagemCapa.alias);
    }

    const loadImagemPerfil = getQueryBuilderViewLoadMeta(options.loadImagemPerfil, true, `${alias}_imagemPerfil`);

    if (loadImagemPerfil) {
      qb.leftJoin(`${alias}.imagemPerfil`, `${loadImagemPerfil.alias}`);
      AppResourceView(AppResource.IMAGEM, qb, loadImagemPerfil.alias);
    }
  }

  //

  async internalFindByMatriculaSiape(matriculaSiape: string): Promise<Spec.IUsuarioFindOneResultDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    qb.andWhere(`${aliasUsuario}.matriculaSiape = :matriculaSiape`, { matriculaSiape: matriculaSiape });

    // =========================================================

    qb.select([]);

    UsuarioService.UsuarioQueryBuilderView(aliasUsuario, qb);

    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario;
  }

  //

  async usuarioFindAll(contextoDeAcesso: IContextoDeAcesso, dto?: Spec.ISearchInputDto): Promise<Spec.IUsuarioFindAllResultDto> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('usuario:find', qb, aliasUsuario, null);

    // =========================================================

    const paginated = await paginate(getPaginateQueryFromSearchInput(dto), qb.clone(), {
      ...paginateConfig,
      select: [
        //
        'id',
        //
        'nome',
        'matriculaSiape',
        'email',
        //
        'dateCreated',
        //
      ],
      sortableColumns: [
        //
        'nome',
        'matriculaSiape',
        'email',
        //
        'dateCreated',
      ],
      searchableColumns: [
        //
        'id',
        //
        'nome',
        'matriculaSiape',
        'email',
        //
      ],
      defaultSortBy: [
        ['nome', 'ASC'],
        ['dateCreated', 'ASC'],
        ['matriculaSiape', 'ASC'],
      ],
      filterableColumns: {},
    });

    // =========================================================

    qb.select([]);

    UsuarioService.UsuarioQueryBuilderView(aliasUsuario, qb, {});

    // =========================================================

    const pageItemsView = await qb.andWhereInIds(map(paginated.data, 'id')).getMany();
    paginated.data = paginated.data.map((paginated) => pageItemsView.find((i) => i.id === paginated.id)!);

    // =========================================================

    return getPaginatedResultDto(paginated);
  }

  async usuarioFindById(contextoDeAcesso: IContextoDeAcesso | null, dto: Spec.IUsuarioFindOneByIdInputDto): Promise<Spec.IUsuarioFindOneResultDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    if (contextoDeAcesso) {
      await contextoDeAcesso.aplicarFiltro('usuario:find', qb, aliasUsuario, null);
    }

    // =========================================================

    qb.andWhere(`${aliasUsuario}.id = :id`, { id: dto.id });

    // =========================================================

    qb.select([]);

    UsuarioService.UsuarioQueryBuilderView(aliasUsuario, qb);

    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario;
  }

  async usuarioFindByIdStrict(contextoDeAcesso: IContextoDeAcesso | null, dto: Spec.IUsuarioFindOneByIdInputDto) {
    const usuario = await this.usuarioFindById(contextoDeAcesso, dto);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  async usuarioFindByIdSimple(
    contextoDeAcesso: IContextoDeAcesso,
    id: Spec.IUsuarioFindOneByIdInputDto['id'],
    options?: IUsuarioQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Spec.IUsuarioFindOneResultDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await contextoDeAcesso.aplicarFiltro('usuario:find', qb, aliasUsuario, null);

    // =========================================================

    qb.andWhere(`${aliasUsuario}.id = :id`, { id });

    // =========================================================

    qb.select([]);

    UsuarioService.UsuarioQueryBuilderView(aliasUsuario, qb);

    if (selection) {
      qb.select(selection);
    }

    // =========================================================

    const usuario = await qb.getOne();

    // =========================================================

    return usuario;
  }

  async usuarioFindByIdSimpleStrict(contextoDeAcesso: IContextoDeAcesso, id: Spec.IUsuarioFindOneByIdInputDto['id'], options?: IUsuarioQueryBuilderViewOptions, selection?: string[]) {
    const usuario = await this.usuarioFindByIdSimple(contextoDeAcesso, id, options, selection);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  //

  private async checkMatriculaSiapeAvailability(matriculaSiape: string, currentUsuarioId: string | null = null) {
    const qb = this.usuarioRepository.createQueryBuilder('usuario');

    qb.where('usuario.matriculaSiape = :matriculaSiape', { matriculaSiape: matriculaSiape });

    if (currentUsuarioId) {
      qb.andWhere('usuario.id <> :currentUsuarioId', { currentUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();

    const isAvailable = !exists;

    return isAvailable;
  }

  private async checkEmailAvailability(email: string, currentUsuarioId: string | null = null) {
    const qb = this.usuarioRepository.createQueryBuilder('usuario');

    qb.where('usuario.email = :email', { email: email });

    if (currentUsuarioId) {
      qb.andWhere('usuario.id <> :currentUsuarioId', { currentUsuarioId });
      qb.limit(1);
    }

    const exists = await qb.getExists();
    const isAvailable = !exists;

    return isAvailable;
  }

  private async ensureDtoAvailability(dto: Partial<Pick<Spec.IUsuarioInputDto, 'email' | 'matriculaSiape'>>, currentUsuarioId: string | null = null) {
    // ===================================

    let isEmailAvailable = true;
    let isMatriculaSiapeAvailable = true;

    // ===================================

    const email = dto.email;

    if (email) {
      isEmailAvailable = await this.checkEmailAvailability(email, currentUsuarioId);
    }

    // ===================================

    const matriculaSiape = dto.matriculaSiape;

    if (matriculaSiape) {
      isMatriculaSiapeAvailable = await this.checkMatriculaSiapeAvailability(matriculaSiape, currentUsuarioId);
    }

    // ===================================

    if (!isMatriculaSiapeAvailable || !isEmailAvailable) {
      throw new ValidationFailedException([
        ...(!isEmailAvailable
          ? [
              {
                scope: 'body',
                path: 'email',
                type: 'email-is-available',
                errors: ['O e-mail informado não está disponível.'],
                name: 'ValidationError',
                message: 'O e-mail informado não está disponível.',
              },
            ]
          : []),
        ...(!isMatriculaSiapeAvailable
          ? [
              {
                scope: 'body',
                path: 'matriculaSiape',
                type: 'matricula-siape-is-available',
                errors: ['A Matrícula SIAPE informada não está disponível.'],
                name: 'ValidationError',
                message: 'A Matrícula SIAPE informada não está disponível.',
              },
            ]
          : []),
      ]);
    }
  }

  //

  private async internalResolveSimpleProperty<Property extends keyof UsuarioEntity>(id: string, property: Property): Promise<UsuarioEntity[Property]> {
    const qb = this.usuarioRepository.createQueryBuilder('usuario');
    qb.select(`usuario.${property}`);

    qb.where('usuario.id = :usuarioId', { usuarioId: id });

    const usuario = await qb.getOneOrFail();
    return usuario[property];
  }

  private async internalResolveMatriculaSiape(id: string) {
    return this.internalResolveSimpleProperty(id, 'matriculaSiape');
  }

  //

  async usuarioGetImagemCapa(contextoDeAcesso: IContextoDeAcesso | null, id: string) {
    const usuario = await this.usuarioFindByIdStrict(contextoDeAcesso, { id: id });

    if (usuario.imagemCapa) {
      const [imagemArquivo] = usuario.imagemCapa.imagemArquivo;

      if (imagemArquivo) {
        const { arquivo } = imagemArquivo;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async usuarioUpdateImagemCapa(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IUsuarioFindOneByIdInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(contextoDeAcesso, { id: dto.id });

    // =========================================================

    await contextoDeAcesso.ensurePermission(
      'usuario:update',
      {
        dto: {
          id: currentUsuario.id,
        },
      },
      currentUsuario.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveUsuarioCapa(file);

    const usuario = this.usuarioRepository.merge(this.usuarioRepository.create(), {
      id: currentUsuario.id,
    });

    this.usuarioRepository.merge(usuario, {
      imagemCapa: {
        id: imagem.id,
      },
    });

    await this.usuarioRepository.save(usuario);

    // =========================================================

    return true;
  }

  async usuarioGetImagemPerfil(contextoDeAcesso: IContextoDeAcesso | null, id: string) {
    const usuario = await this.usuarioFindByIdStrict(contextoDeAcesso, { id: id });

    if (usuario.imagemPerfil) {
      const [imagemArquivo] = usuario.imagemPerfil.imagemArquivo;

      if (imagemArquivo) {
        const { arquivo } = imagemArquivo;
        return this.arquivoService.getStreamableFile(null, arquivo.id, null);
      }
    }

    throw new NotFoundException();
  }

  async usuarioUpdateImagemPerfil(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IUsuarioFindOneByIdInputDto, file: Express.Multer.File) {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(contextoDeAcesso, { id: dto.id });

    // =========================================================

    await contextoDeAcesso.ensurePermission(
      'usuario:update',
      {
        dto: {
          id: currentUsuario.id,
        },
      },
      currentUsuario.id,
    );

    // =========================================================

    const { imagem } = await this.imagemService.saveUsuarioPerfil(file);

    const usuario = this.usuarioRepository.merge(this.usuarioRepository.create(), {
      id: currentUsuario.id,
    });

    this.usuarioRepository.merge(usuario, {
      imagemPerfil: {
        id: imagem.id,
      },
    });

    await this.usuarioRepository.save(usuario);

    // =========================================================

    return true;
  }

  //

  async usuarioCreate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IUsuarioInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('usuario:create', { dto });

    // =========================================================

    const input = pick(dto, ['nome', 'matriculaSiape', 'email']);

    await this.ensureDtoAvailability(input, null);

    const usuario = this.usuarioRepository.create();

    this.usuarioRepository.merge(usuario, {
      ...input,
      isSuperUser: false,
    });

    // =========================================================

    await this.databaseContext
      .transaction(async ({ databaseContext: { usuarioRepository } }) => {
        await usuarioRepository.save(usuario);

        const kcAdminClient = await this.keycloakService.getAdminClient();

        await kcAdminClient.users.create({
          enabled: true,

          username: input.matriculaSiape,
          email: input.email,

          requiredActions: ['UPDATE_PASSWORD'],

          attributes: {
            'usuario.matriculaSiape': input.matriculaSiape,
          },
        });
      })
      .catch((err) => {
        console.debug('Erro ao cadastrar usuário:', err);
        throw new InternalServerErrorException();
      });

    return this.usuarioFindByIdStrict(contextoDeAcesso, { id: usuario.id });
  }

  async usuarioUpdate(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IUsuarioUpdateDto) {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(contextoDeAcesso, {
      id: dto.id,
    });

    const currentMatriculaSiape = currentUsuario.matriculaSiape ?? (await this.internalResolveMatriculaSiape(currentUsuario.id));

    const kcUser = await this.keycloakService.findUserByMatriculaSiape(currentMatriculaSiape);

    if (!kcUser) {
      throw new ServiceUnavailableException();
    }

    // =========================================================

    await contextoDeAcesso.ensurePermission('usuario:update', { dto }, dto.id, this.usuarioRepository.createQueryBuilder(aliasUsuario));

    const input = pick(dto, ['nome', 'matriculaSiape', 'email']);

    await this.ensureDtoAvailability(input, dto.id);

    const usuario = {
      id: currentUsuario.id,
    } as UsuarioEntity;

    this.usuarioRepository.merge(usuario, {
      ...input,
    });

    // =========================================================

    await this.databaseContext.transaction(async ({ databaseContext: { usuarioRepository } }) => {
      await usuarioRepository.save(usuario);

      const changedEmail = has(dto, 'email');
      const changedMatriculaSiape = has(dto, 'matriculaSiape');

      if (changedEmail || changedMatriculaSiape) {
        const kcAdminClient = await this.keycloakService.getAdminClient();

        if (changedMatriculaSiape) {
          await kcAdminClient.users.update(
            { id: kcUser.id! },
            {
              username: input.matriculaSiape,
              attributes: {
                'usuario.matriculaSiape': input.matriculaSiape,
              },
            },
          );
        }

        if (changedEmail) {
          await kcAdminClient.users.update(
            { id: kcUser.id! },
            {
              email: dto.email,
            },
          );
        }
      }
    });

    // =========================================================

    return this.usuarioFindByIdStrict(contextoDeAcesso, { id: usuario.id });
  }

  //

  async usuarioDeleteOneById(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IUsuarioDeleteOneByIdInputDto) {
    // =========================================================

    await contextoDeAcesso.ensurePermission('usuario:delete', { dto }, dto.id, this.usuarioRepository.createQueryBuilder(aliasUsuario));

    // =========================================================

    const usuario = await this.usuarioFindByIdStrict(contextoDeAcesso, dto);

    // =========================================================

    if (usuario) {
      await this.usuarioRepository
        .createQueryBuilder(aliasUsuario)
        .update()
        .set({
          dateDeleted: 'NOW()',
        })
        .where('id = :blocoId', { blocoId: usuario.id })
        .andWhere('dateDeleted IS NULL')
        .execute();
    }

    // =========================================================

    return true;
  }
}
