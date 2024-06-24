import { ResolveAccessContextPipe } from '../-pipes';
import { RequestActorHttp } from '../../../authentication';

export const AccessContextHttp = (options?: any) => RequestActorHttp(options, ResolveAccessContextPipe);

/**
 * @deprecated use AccessContextHttp
 */
export const ContextoDeAcessoHttp = AccessContextHttp;
