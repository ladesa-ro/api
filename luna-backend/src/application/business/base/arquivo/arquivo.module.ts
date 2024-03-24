import { Module } from '@nestjs/common';
import { ArquivoService } from './arquivo.service';
import { ImagemModule } from './imagem/imagem.module';

@Module({
  imports: [ImagemModule],
  controllers: [],
  providers: [ArquivoService],
  exports: [ArquivoService],
})
export class ArquivoModule {}
