import { ForbiddenException, Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { DatabaseContextService } from '../integrate-database/database-context/database-context.service';
import { IdpConnectTceService } from './idp-external-connect/idp-external-connect.service';
import { ICurrentUsuario } from './interfaces';

@Injectable()
export class AuthenticationService {
  constructor(
    private idpConnectTceService: IdpConnectTceService,
    private dabaseContextService: DatabaseContextService,
  ) {}

  //

  get usuarioRepository() {
    return this.dabaseContextService.usuarioRepository;
  }

  //

  private async getCurrentUsuarioByMatriculaSiape(matriculaSiape: string): Promise<ICurrentUsuario> {
    const usuario = await this.usuarioRepository
      .createQueryBuilder('usuario')
      .select([
        //
        'usuario.id',
        'usuario.nome',
        'usuario.matriculaSiape',
        'usuario.email',
        'usuario.isSuperUser',
      ])
      .where('usuario.matriculaSiape = :matriculaSiape', { matriculaSiape: matriculaSiape })
      .andWhere('usuario.dateDeleted IS NULL')
      .getOne();

    if (usuario) {
      return {
        ...pick(usuario, [
          //
          'id',
          'nome',
          'matriculaSiape',
          'email',
          'isSuperUser',
        ]),
      };
    }

    throw new ForbiddenException('O usuário não possui perfil no sistema.');
  }

  async getCurrentFuncionarioByAccessToken(accessToken?: string): Promise<ICurrentUsuario> {
    if (typeof accessToken === 'string') {
      if (process.env.ENABLE_MOCK_ACCESS_TOKEN === 'true') {
        const matriculaSiapeMockMatch = accessToken.match(/^mock\.siape\.(\d{1,})$/);

        if (matriculaSiapeMockMatch) {
          const matriculaSiape = matriculaSiapeMockMatch[1];
          return this.getCurrentUsuarioByMatriculaSiape(matriculaSiape);
        }
      }

      const tokenSet = await this.idpConnectTceService.getIdentityResponseFromAccessToken(accessToken);

      return this.getCurrentUsuarioByMatriculaSiape(tokenSet.usuario?.matriculaSiape);
    }

    return null;
  }
}
