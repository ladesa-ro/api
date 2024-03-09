import { Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { ValidationFailedException } from 'infrastructure';
import { KeycloakService } from 'infrastructure/authentication/idp-external-connect/keycloak';
import { UsuarioEntity } from 'infrastructure/integrate-database/typeorm/entities/autenticacao/usuario.entity';
import { has, pick } from 'lodash';
import { SelectQueryBuilder } from 'typeorm';
import * as Dtos from '../../(spec)';
import { IClientAccess } from '../../../../domain';
import { DatabaseContextService } from '../../../../infrastructure/integrate-database/database-context/database-context.service';

// ============================================================================

const aliasUsuario = 'usuario';

// ============================================================================

export type IUsuarioQueryBuilderViewOptions = never;

// ============================================================================

@Injectable()
export class UsuarioService {
  constructor(
    private keycloakService: KeycloakService,
    private databaseContext: DatabaseContextService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  //

  static UsuarioQueryBuilderView(alias: string, qb: SelectQueryBuilder<any>) {
    qb.addSelect([
      //
      `${alias}.id`,
      `${alias}.nome`,
      `${alias}.matriculaSiape`,
      `${alias}.email`,
    ]);
  }

  //

  async internalFindByMatriculaSiape(matriculaSiape: string): Promise<Dtos.IUsuarioFindOneResultDto | null> {
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

  async usuarioFindAll(clientAccess: IClientAccess): Promise<Dtos.IUsuarioFindOneResultDto[]> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await clientAccess.applyFilter('usuario:find', qb, aliasUsuario, null);

    // =========================================================

    qb.select([]);

    UsuarioService.UsuarioQueryBuilderView(aliasUsuario, qb);

    // =========================================================

    qb.orderBy(`${aliasUsuario}.dateCreated`, 'ASC');

    // =========================================================

    const usuarios = await qb.getMany();

    // =========================================================

    return usuarios;
  }

  async usuarioFindById(clientAccess: IClientAccess, dto: Dtos.IUsuarioFindOneByIdInputDto): Promise<Dtos.IUsuarioFindOneResultDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await clientAccess.applyFilter('usuario:find', qb, aliasUsuario, null);

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

  async usuarioFindByIdStrict(clientAccess: IClientAccess, dto: Dtos.IUsuarioFindOneByIdInputDto) {
    const usuario = await this.usuarioFindById(clientAccess, dto);

    if (!usuario) {
      throw new NotFoundException();
    }

    return usuario;
  }

  async usuarioFindByIdSimple(
    clientAccess: IClientAccess,
    id: Dtos.IUsuarioFindOneByIdInputDto['id'],
    options?: IUsuarioQueryBuilderViewOptions,
    selection?: string[],
  ): Promise<Dtos.IUsuarioFindOneResultDto | null> {
    // =========================================================

    const qb = this.usuarioRepository.createQueryBuilder(aliasUsuario);

    // =========================================================

    await clientAccess.applyFilter('usuario:find', qb, aliasUsuario, null);

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

  async usuarioFindByIdSimpleStrict(clientAccess: IClientAccess, id: Dtos.IUsuarioFindOneByIdInputDto['id'], options?: IUsuarioQueryBuilderViewOptions, selection?: string[]) {
    const usuario = await this.usuarioFindByIdSimple(clientAccess, id, options, selection);

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

  private async ensureDtoAvailability(dto: Partial<Pick<Dtos.IUsuarioInputDto, 'email' | 'matriculaSiape'>>, currentUsuarioId: string | null = null) {
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

  async usuarioCreate(clientAccess: IClientAccess, dto: Dtos.IUsuarioInputDto) {
    // =========================================================

    await clientAccess.ensurePermissionCheck('usuario:create', { dto });

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

    return this.usuarioFindByIdStrict(clientAccess, { id: usuario.id });
  }

  async usuarioUpdate(clientAccess: IClientAccess, dto: Dtos.IUsuarioUpdateDto) {
    // =========================================================

    const currentUsuario = await this.usuarioFindByIdStrict(clientAccess, {
      id: dto.id,
    });

    const currentMatriculaSiape = currentUsuario.matriculaSiape ?? (await this.internalResolveMatriculaSiape(currentUsuario.id));

    const kcUser = await this.keycloakService.findUserByMatriculaSiape(currentMatriculaSiape);

    if (!kcUser) {
      throw new ServiceUnavailableException();
    }

    // =========================================================

    await clientAccess.ensureCanReach('usuario:update', { dto }, this.usuarioRepository.createQueryBuilder(aliasUsuario), dto.id);

    const input = pick(dto, ['nome', 'matriculaSiape', 'email']);

    await this.ensureDtoAvailability(input, dto.id);

    const usuario = <UsuarioEntity>{
      id: currentUsuario.id,
    };

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

    return this.usuarioFindByIdStrict(clientAccess, { id: usuario.id });
  }

  //

  async usuarioDeleteOneById(clientAccess: IClientAccess, dto: Dtos.IUsuarioDeleteOneByIdInputDto) {
    // =========================================================

    await clientAccess.ensureCanReach('usuario:delete', { dto }, this.usuarioRepository.createQueryBuilder(aliasUsuario), dto.id);

    // =========================================================

    const usuario = await this.usuarioFindByIdStrict(clientAccess, dto);

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
