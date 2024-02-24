import { SisgeaRequestUserGql } from '@sisgea/nest-auth-connect/gql';
import { ResolveClientAccessPipe } from './pipes/ResolveClientAccessPipe';

export const ClientAccessGraphQl = (options?: any) => SisgeaRequestUserGql(options, ResolveClientAccessPipe);
