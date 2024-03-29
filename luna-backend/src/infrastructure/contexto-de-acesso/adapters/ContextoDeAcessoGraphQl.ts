import { CurrentUsuarioGql } from '../../authentication';
import { ResolveContextoDeAcessoPipe } from './pipes/ResolveContextoDeAcessoFromCurrentUsuario.pipe';

export const ContextoDeAcessoGraphQl = (options?: any) => CurrentUsuarioGql(options, ResolveContextoDeAcessoPipe);
