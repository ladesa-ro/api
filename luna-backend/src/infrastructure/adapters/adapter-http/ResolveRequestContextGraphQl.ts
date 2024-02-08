import { SisgeaRequestUserHttp } from '@sisgea/nest-auth-connect/http';
import { ResolveRequestContextPipe } from '../ResolveRequestContextPipe';

export const ResolveRequestContextHttp = (options?: any) =>
  SisgeaRequestUserHttp(options, ResolveRequestContextPipe);
