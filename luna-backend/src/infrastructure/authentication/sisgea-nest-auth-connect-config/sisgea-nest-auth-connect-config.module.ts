import { Global, Module } from '@nestjs/common';
import { SisgeaNestAuthConnectConfigProvider } from './providers/sisgea-nest-auth-connect-config.provider';
import { EnvironmentConfigModule } from '../../environment-config';

@Global()
@Module({
  imports: [
    // ...
    EnvironmentConfigModule,
  ],
  providers: [
    // ...
    SisgeaNestAuthConnectConfigProvider,
  ],
  exports: [
    // ...
    SisgeaNestAuthConnectConfigProvider,
  ],
})
export class SisgeaNestAuthConnectConfigModule {}
