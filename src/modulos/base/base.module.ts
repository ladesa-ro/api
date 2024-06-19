import { Module } from '@nestjs/common';
import { ArquivoModule } from './arquivo/arquivo.module';
import { ImagemArquivoModule } from './imagem-arquivo/imagem-arquivo.module';
import { ImagemModule } from './imagem/imagem.module';

@Module({
  imports: [ImagemModule, ArquivoModule, ImagemArquivoModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class BaseModule {}
