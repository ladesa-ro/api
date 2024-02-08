import { Module } from '@nestjs/common';
import { BaseModule } from './base/base.module';

@Module({
  imports: [
    //
    BaseModule,
  ],
})
export class CoreModule {}
