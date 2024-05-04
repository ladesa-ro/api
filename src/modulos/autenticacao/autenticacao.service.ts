import { BadRequestException, ForbiddenException, HttpException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import * as Spec from '@sisgea/spec';
import { BaseClient, TokenSet } from 'openid-client';
import { IContextoDeAcesso } from '../../contexto-de-acesso';
import { DatabaseContextService } from '../../integracao-banco-de-dados';
import { KeycloakService, OpenidConnectService } from '../../integracao-identidade-e-acesso';
import { UsuarioService } from './usuario/usuario.service';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private keycloakService: KeycloakService,
    private databaseContext: DatabaseContextService,
    private openidConnectService: OpenidConnectService,
  ) {}

  //

  get usuarioRepository() {
    return this.databaseContext.usuarioRepository;
  }

  //

  async quemSouEu(contextoDeAcesso: IContextoDeAcesso) {
    const usuario = contextoDeAcesso.usuario ? await this.usuarioService.usuarioFindById(contextoDeAcesso, { id: contextoDeAcesso.usuario.id }) : null;

    return {
      usuario: usuario,
    };
  }

  async login(contextoDeAcesso: IContextoDeAcesso, dto: Spec.IAutenticacaoLoginInputDto): Promise<Spec.IAutenticacaoLoginResultDto> {
    if (contextoDeAcesso.usuario !== null) {
      throw new BadRequestException('Você não pode usar a rota de login caso já esteja logado.');
    }

    let trustIssuerClient: BaseClient;

    try {
      trustIssuerClient = await this.openidConnectService.getTrustIssuerClient();
    } catch (error) {
      throw new ServiceUnavailableException();
    }

    const { usuario, userRepresentation } = await this.findByMatriculaSiape(dto.matriculaSiape);

    try {
      if (usuario && userRepresentation) {
        const tokenset = await trustIssuerClient.grant({
          grant_type: 'password',
          username: userRepresentation.username,
          password: dto.senha,
          scope: 'openid profile',
        });

        const formattedTokenSet = this.formatTokenSet(tokenset);

        return formattedTokenSet;
      }
    } catch (error) {}

    throw new ForbiddenException('Credenciais inválidas.');
  }

  async refresh(_: IContextoDeAcesso, dto: Spec.IAutenticacaoRefreshInputDto): Promise<Spec.IAutenticacaoLoginResultDto> {
    let trustIssuerClient: BaseClient;

    try {
      trustIssuerClient = await this.openidConnectService.getTrustIssuerClient();
    } catch (error) {
      throw new ServiceUnavailableException();
    }

    try {
      const refreshToken = dto.refreshToken;

      if (refreshToken) {
        const tokenset = await trustIssuerClient.refresh(refreshToken);
        const formattedTokenSet = this.formatTokenSet(tokenset);
        return formattedTokenSet;
      }
    } catch (error) {}

    throw new ForbiddenException('Credenciais inválidas ou expiradas.');
  }

  async definirSenha(_contextoDeAcesso: IContextoDeAcesso, dto: Spec.IAutenticacaoDefinirSenhaInputDto): Promise<Spec.IAutenticacaoDefinirSenhaResultDto> {
    try {
      const kcAdminClient = await this.keycloakService.getAdminClient();

      const { usuario, userRepresentation } = await this.findByMatriculaSiape(dto.matriculaSiape);

      if (!usuario || !userRepresentation) {
        throw new ForbiddenException('Usuário indisponível.');
      }

      const userCredentials = await kcAdminClient.users.getCredentials({ id: userRepresentation.id! });

      if (userRepresentation.requiredActions?.includes('UPDATE_PASSWORD') && userCredentials.length === 0) {
        await kcAdminClient.users.resetPassword({
          id: userRepresentation.id!,
          credential: {
            type: 'password',
            temporary: false,
            value: dto.senha,
          },
        });
        await kcAdminClient.users.update(
          {
            id: userRepresentation.id!,
          },
          {
            enabled: true,
          },
        );

        return {
          result: 'ok',
        };
      } else {
        throw new ForbiddenException('A senha do usuário já foi definida.');
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      console.debug('AutenticacaoService#definirSenha::err', error);

      throw new ServiceUnavailableException();
    }
  }

  private formatTokenSet(tokenset: TokenSet) {
    return {
      access_token: tokenset.access_token ?? null,
      token_type: tokenset.token_type ?? null,
      id_token: tokenset.id_token ?? null,
      refresh_token: tokenset.refresh_token ?? null,
      expires_in: tokenset.expires_in ?? null,
      expires_at: tokenset.expires_at ?? null,
      session_state: tokenset.session_state ?? null,
      scope: tokenset.scope ?? null,
    };
  }

  private async findByMatriculaSiape(matriculaSiape: string) {
    const qb = this.usuarioRepository.createQueryBuilder('usuario');

    qb.where('usuario.matriculaSiape = :matriculaSiape', { matriculaSiape: matriculaSiape });
    qb.andWhere('usuario.dateDeleted IS NULL');
    qb.select(['usuario']);

    const usuario = await qb.getOne();

    const userRepresentation = await this.keycloakService.findUserByMatriculaSiape(matriculaSiape);

    return {
      usuario,
      userRepresentation,
    };
  }
}
