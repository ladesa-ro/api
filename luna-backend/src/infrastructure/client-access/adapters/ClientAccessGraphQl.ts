import { CurrentUsuarioGql } from '../../authentication';
import { ResolveClientAccessPipe } from './pipes/ResolveClientAccessFromCurrentUsuario.pipe';

export const ClientAccessGraphQl = (options?: any) => CurrentUsuarioGql(options, ResolveClientAccessPipe);
