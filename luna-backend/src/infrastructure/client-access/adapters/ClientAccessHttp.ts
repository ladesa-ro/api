import { SisgeaRequestUserHttp } from '@sisgea/nest-auth-connect/http';
import { ResolveClientAccessPipe } from './pipes/ResolveClientAccessPipe';

export const ClientAccessHttp = (options?: any) => SisgeaRequestUserHttp(options, ResolveClientAccessPipe);
