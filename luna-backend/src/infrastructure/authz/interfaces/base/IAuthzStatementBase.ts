import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { IRequestContext } from '../../../../domain';

// ================================================================

export type IAuthzStatementBaseFind<
  Target extends string = string,
  Entity extends ObjectLiteral = ObjectLiteral,
  Context = void,
  RequestContext extends IRequestContext = IRequestContext,
> = {
  action: 'find';
  target: Target;

  compositeMode: 'include';

  filter: (
    qb: SelectQueryBuilder<Entity>,
    context: Context,
    requestContext: RequestContext,
  ) => void;
};

// ================================================================

export type IAuthzStatementBaseCreate<
  Target extends string,
  Context = unknown,
  RequestContext extends IRequestContext = IRequestContext,
> = {
  action: 'create';
  target: Target;

  check: (context: Context, requestContext: RequestContext) => Promise<boolean>;
};

export type IAuthzStatementBaseUpdate<
  Target extends string,
  Context = unknown,
  RequestContext extends IRequestContext = IRequestContext,
> = {
  action: 'update';
  target: Target;

  check: (context: Context, requestContext: RequestContext) => Promise<boolean>;
};

// ================================================================
