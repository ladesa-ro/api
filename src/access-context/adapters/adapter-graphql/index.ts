import { ResolveAccessContextPipe } from '../-pipes';
import { RequestActorGql } from '../../../authentication';

export const AccessContextGraphQl = (options?: any) => RequestActorGql(options, ResolveAccessContextPipe);

/**
 * @deprecated use AccessContextGraphQl
 */
export const ContextoDeAcessoGraphQl = AccessContextGraphQl;
