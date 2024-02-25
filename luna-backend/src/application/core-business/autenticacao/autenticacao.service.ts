import { BadRequestException, ForbiddenException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { BaseClient } from 'openid-client';
import { IAutenticacaoLoginInputDto, IAutenticacaoLoginResultDto } from '../(dtos)';
import { IClientAccess } from '../../../domain';
import { OpenidConnectService } from '../../../infrastructure/authentication/idp-external-connect/openid-connect/openid-connect.service';
import { UsuarioService } from './usuario/usuario.service';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private openidConnectService: OpenidConnectService,
  ) {}

  async quemSouEu(clientAccess: IClientAccess) {
    const usuario = clientAccess.currentUsuario ? await this.usuarioService.usuarioFindById(clientAccess, { id: clientAccess.currentUsuario.id }) : null;

    return {
      usuario: usuario,
    };
  }

  async login(clientAccess: IClientAccess, dto: IAutenticacaoLoginInputDto): Promise<IAutenticacaoLoginResultDto> {
    if (clientAccess.currentUsuario !== null) {
      throw new BadRequestException('Você não pode usar a rota de login caso já esteja logado.');
    }

    let trustIssuerClient: BaseClient;

    try {
      trustIssuerClient = await this.openidConnectService.getTrustIssuerClient();
    } catch (error) {
      throw new ServiceUnavailableException();
    }

    const { matriculaSiape, senha } = dto;

    try {
      const tokenset = await trustIssuerClient.grant({
        grant_type: 'password',
        username: matriculaSiape,
        password: senha,
        scope: 'openid profile',
      });

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
    } catch (error) {}

    throw new ForbiddenException('Credenciais inválidas.');
  }
}
