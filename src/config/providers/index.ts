import { Provider } from '@nestjs/common';
import { EnvironmentConfigService } from '../adapters';
import { AppConfigService } from '../tokens';

export const ProviderAppConfigService: Provider = {
  provide: AppConfigService,
  useClass: EnvironmentConfigService,
  
};
