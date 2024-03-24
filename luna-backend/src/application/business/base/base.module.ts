import { Module } from '@nestjs/common';
import { ArquivoModule } from './arquivo/arquivo.module';
import { ImagemModule } from './imagem/imagem.module';

@Module({
  imports: [ImagemModule, ArquivoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BaseModule {}
