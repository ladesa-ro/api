import { IAuthzStatementCampus } from './campus';
import { IAuthzStatementCidade } from './cidade';
import { IAuthzStatementEstado } from './estado';

// ==================================================================

export type IAuthzStatement =
  | IAuthzStatementCampus
  | IAuthzStatementCidade
  | IAuthzStatementEstado;

// ==================================================================

export const createStatement = <CreatedStatement extends IAuthzStatement>(
  options: CreatedStatement,
) => options;

// ==================================================================
