import { AuthzStatement } from '../AuthzStatement';

//

export abstract class BaseAuthzProvider {
  abstract getStatements(): AuthzStatement[];
}
