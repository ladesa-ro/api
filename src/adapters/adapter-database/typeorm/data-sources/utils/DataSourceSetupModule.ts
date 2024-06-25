import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigModule } from '../../../../../app-config';

@Module({
  imports: [
    //
    NestConfigModule.forRoot({ isGlobal: true }),
    AppConfigModule,
  ],
  providers: [
    // ...
  ],
})
export class DataSourceSetupModule {}
