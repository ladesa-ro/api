import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigModule } from '../../../../config';

@Module({
  imports: [
    //
    ConfigModule.forRoot({ isGlobal: true }),
    EnvironmentConfigModule,
  ],
  providers: [
    // ...
  ],
})
export class DataSourceSetupModule {}
