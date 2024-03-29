import { CurrentUsuarioHttp } from '../../authentication';
import { ResolveContextoDeAcessoPipe } from './pipes/ResolveContextoDeAcessoFromCurrentUsuario.pipe';

export const ContextoDeAcessoHttp = (options?: any) => CurrentUsuarioHttp(options, ResolveContextoDeAcessoPipe);
