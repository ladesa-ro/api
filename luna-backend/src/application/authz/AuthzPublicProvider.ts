import { BaseAuthzProvider } from '../../infrastructure/authz/authz-provider/BaseAuthzProvider';
import { createStatementFind } from '../../infrastructure/authz/AuthzStatement';

export class AuthzPublicProvider extends BaseAuthzProvider {
  getStatements() {
    return [
      // ...
      this.estadoFind,
      this.cidadeFind,
      this.campusFind,
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

  get cidadeFind() {
    return createStatementFind({
      target: 'cidade',
      mode: 'include',
      filter(qb) {
        qb.where('TRUE');
      },
    });
  }

  get campusFind() {
    return createStatementFind({
      target: 'campus',
      mode: 'include',
      filter(qb) {
        qb.where('TRUE');
      },
    });
  }
}
