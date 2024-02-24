import { Module } from '@nestjs/common';
import { CampusModule } from '../campus/campus.module';
import { BlocoController } from './bloco.controller';
import { CampusResolver } from './bloco.resolver';
import { BlocoService } from './bloco.service';

@Module({
  imports: [CampusModule],
  controllers: [BlocoController],
  providers: [BlocoService, CampusResolver],
  exports: [BlocoService],
})
export class BlocoModule {}
