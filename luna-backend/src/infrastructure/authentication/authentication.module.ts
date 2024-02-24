import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGqlGuard, SisgeaNestAuthConnectModule } from '@sisgea/nest-auth-connect/gql';
import { SisgeaNestAuthConnectConfigModule } from './sisgea-nest-auth-connect-config';

@Global()
@Module({
  imports: [
    //
    SisgeaNestAuthConnectConfigModule,
    SisgeaNestAuthConnectModule,
  ],
  providers: [
    //
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGqlGuard,
    },
  ],
})
export class AuthenticationModule {}
