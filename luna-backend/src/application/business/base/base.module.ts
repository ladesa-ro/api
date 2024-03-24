import { Module } from '@nestjs/common';
import { ArquivoModule } from './arquivo/arquivo.module';

@Module({
  imports: [ArquivoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BaseModule {}
