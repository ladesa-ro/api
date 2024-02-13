import { createStatement } from '../../infrastructure';
import { BaseAuthzProvider } from '../../infrastructure/authz/authz-provider/BaseAuthzProvider';

export class AuthzPublicProvider extends BaseAuthzProvider {
  getStatements() {
    return [
      // ...
      this.estadoFind,
      this.cidadeFind,
      this.campusFind,
      this.campusCreate,
      this.campusUpdate,
      this.campusDelete,
    ];
  }

  get estadoFind() {
    return createStatement({
      action: 'find',

      target: 'estado',
      compositeMode: 'include',

      filter(qb) {
        qb.where('TRUE');
      },
    });
  }

  get cidadeFind() {
    return createStatement({
      action: 'find',

      target: 'cidade',
      compositeMode: 'include',

      filter(qb) {
        qb.where('TRUE');
      },
    });
  }

  get campusFind() {
    return createStatement({
      action: 'find',

      target: 'campus',
      compositeMode: 'include',

      filter(qb) {
        qb.where('campus.dateDeleted IS NULL');
      },
    });
  }

  get campusCreate() {
    return createStatement({
      action: 'create',

      target: 'campus',

      async check(context, requestUser) {
        console.debug('create', 'campus', { context, requestUser });
        return true;
      },
    });
  }

  get campusUpdate() {
    return createStatement({
      action: 'update',

      target: 'campus',

      async check(context, requestUser) {
        console.debug('update', 'campus', { context, requestUser });
        return true;
      },
    });
  }

  get campusDelete() {
    return createStatement({
      action: 'delete',

      target: 'campus',

      async check(context, requestUser) {
        console.debug('delete', 'campus', { context, requestUser });
        return true;
      },
    });
  }
}
