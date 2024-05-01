import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './AuthGuards';
import { SessionSerializer } from './AuthSerializers';
import { AccessTokenStrategy, AuthStrategy } from './AuthStrategies';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: AuthStrategy.ACCESS_TOKEN,
    }),
  ],

  providers: [
    AccessTokenStrategy,
    SessionSerializer,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],

  exports: [SessionSerializer],
})
export class AutenticacaoPassportModule {}
