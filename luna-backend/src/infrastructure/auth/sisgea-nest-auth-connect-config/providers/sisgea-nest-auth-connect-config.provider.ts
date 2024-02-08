import { Provider } from '@nestjs/common';
import {
  ISisgeaNestAuthConnectConfig,
  SisgeaNestAuthConnectProvidedConfig,
} from '@sisgea/nest-auth-connect';
import { EnvironmentConfigService } from '../../../environment-config';

export const SisgeaNestAuthConnectConfigProvider: Provider<ISisgeaNestAuthConnectConfig> =
  {
    provide: SisgeaNestAuthConnectProvidedConfig,

    useFactory: (
      environmentConfigService: EnvironmentConfigService,
    ): ISisgeaNestAuthConnectConfig => {
      return environmentConfigService;
    },

    inject: [EnvironmentConfigService],
  };
