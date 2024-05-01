import { ForbiddenException, Injectable } from '@nestjs/common';
import { pick } from 'lodash';
import { IUsuarioDaRequisicao } from '.';
import { IntegrateExternalIdentityAndAccessManagementService } from '../../infraestrutura';
import { DatabaseContextService } from '../../infraestrutura/integrations/integracao-banco-de-dados';

@Injectable()
export class UsuarioDaRequisicaoService {
  constructor(
    private idpConnectTceService: IntegrateExternalIdentityAndAccessManagementService,
    private dabaseContextService: DatabaseContextService,
  ) {}

  //

  get usuarioRepository() {
    return this.dabaseContextService.usuarioRepository;
  }

  //

  async getCurrentFuncionarioByAccessToken(accessToken?: string): Promise<IUsuarioDaRequisicao> {
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

  private async getCurrentUsuarioByMatriculaSiape(matriculaSiape: string): Promise<IUsuarioDaRequisicao> {
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
}
