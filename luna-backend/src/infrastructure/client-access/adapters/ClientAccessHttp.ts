import { CurrentUsuarioHttp } from '../../authentication';
import { ResolveClientAccessPipe } from './pipes/ResolveClientAccessFromCurrentUsuario.pipe';

export const ClientAccessHttp = (options?: any) => CurrentUsuarioHttp(options, ResolveClientAccessPipe);
