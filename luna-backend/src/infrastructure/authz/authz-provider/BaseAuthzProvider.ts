import { IAuthzStatement } from '../interfaces';

//

export abstract class BaseAuthzProvider {
  abstract getStatements(): IAuthzStatement[];
}
