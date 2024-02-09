import { SisgeaRequestUserGql } from '@sisgea/nest-auth-connect/gql';
import { ResolveRequestContextPipe } from '../../ResolveRequestContextPipe';

export const ResolveRequestContextGraphQl = (options?: any) =>
  SisgeaRequestUserGql(options, ResolveRequestContextPipe);
