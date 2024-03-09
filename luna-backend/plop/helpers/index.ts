import { NodePlopAPI } from 'plop';
import { ChangeCaseHelperPlop } from './change-case.helper';

export * from './change-case.helper';

export function Helpers(plop: NodePlopAPI) {
  ChangeCaseHelperPlop(plop);

  plop.setHelper('eq', (a, b) => a === b);
  plop.setHelper('not', (a) => !a);

  plop.setHelper('empty', (a) => {
    if (typeof a === 'string' || Array.isArray(a)) {
      return a.length === 0;
    }
    return false;
  });

  plop.setHelper('ternary', (cond, a, b) => (cond ? a : b));
}
