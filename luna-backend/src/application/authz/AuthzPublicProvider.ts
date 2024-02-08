import { BaseAuthzProvider } from '../../infrastructure/authz/authz-provider/BaseAuthzProvider';
import { createStatementFind } from '../../infrastructure/authz/AuthzStatement';

export class AuthzPublicProvider extends BaseAuthzProvider {
  getStatements() {
    return [
      // ...
      this.estadoFind,
    ];
  }

  get estadoFind() {
    return createStatementFind({
      target: 'estado',
      mode: 'include',
      filter(qb) {
        qb.where('TRUE');
      },
    });
  }
}