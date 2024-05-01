import { EnvironmentConfigModule } from '@/config/environment-config';
import { Module } from '@nestjs/common';

@Module({
  imports: [EnvironmentConfigModule],
  controllers: [],
  exports: [],
  providers: [],
})
export class ConfigModule {}
