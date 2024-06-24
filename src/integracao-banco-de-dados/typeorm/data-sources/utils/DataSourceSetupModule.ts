import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ConfigModule } from '../../../../config';

@Module({
  imports: [
    //
    NestConfigModule.forRoot({ isGlobal: true }),
    ConfigModule,
  ],
  providers: [
    // ...
  ],
})
export class DataSourceSetupModule {}
