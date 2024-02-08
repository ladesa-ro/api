import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

// =============================================================================

export const AuthzStatementActionFind = Symbol.for('AuthzStatementActionFind');

export type AuthzStatementFind<Entity extends ObjectLiteral = ObjectLiteral> = {
  action: typeof AuthzStatementActionFind;
  target: string;
  mode: 'include';
  filter: (qb: SelectQueryBuilder<Entity>) => void;
};

// =============================================================================

export type AuthzStatementResult = {
  action: string;
  target: string;
  result: boolean;
};

export type AuthzStatement = AuthzStatementFind | AuthzStatementResult;

// =============================================================================

export const createStatementFind = <
  Entity extends ObjectLiteral = ObjectLiteral,
  //
  CreatedStatement extends Omit<AuthzStatementFind<Entity>, 'action'> = Omit<
    AuthzStatementFind<Entity>,
    'action'
  >,
>(
  options: CreatedStatement,
): AuthzStatementFind<Entity> => ({
  action: AuthzStatementActionFind,
  ...options,
});

// =============================================================================

export const testStatementTarget =
  (target: string) => (statement: AuthzStatement) =>
    statement.target === target;

export const testStatementActionFind =
  () =>
  (statement: AuthzStatement): statement is AuthzStatementFind =>
    statement.action === AuthzStatementActionFind;

// =============================================================================

export const filterStatementsTargetAndActionFind = (
  statements: AuthzStatement[],
  target: string,
) =>
  statements
    .filter(testStatementTarget(target))
    .filter(testStatementActionFind());

// =============================================================================
