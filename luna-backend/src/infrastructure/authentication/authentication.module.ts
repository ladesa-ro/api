import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from './authentication.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { IdpExternalConnectModule } from './idp-external-connect/idp-external-connect.module';
import { JwksRsaClientModule } from './idp-external-connect/jwks-rsa-client';
import { OpenidConnectModule } from './idp-external-connect/openid-connect';
import { SessionSerializer } from './serializers';
import { AccessTokenStrategy } from './strategies';
import { AuthStrategies } from './strategies/auth-strategies';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    OpenidConnectModule,
    JwksRsaClientModule,
    IdpExternalConnectModule,

    PassportModule.register({
      defaultStrategy: AuthStrategies.ACCESS_TOKEN,
    }),

    JwksRsaClientModule,
  ],

  providers: [
    // ...
    AuthenticationService,
    AccessTokenStrategy,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],

  exports: [
    // ...
    SessionSerializer,
  ],
})
export class AuthenticationModule {}
