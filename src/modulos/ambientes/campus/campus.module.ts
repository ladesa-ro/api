import { Module } from '@nestjs/common';
import { ModalidadeModule } from '../../ensino/modalidade/modalidade.module';
import { EnderecoModule } from '../endereco/endereco.module';
import { CampusController } from './campus.controller';
import { CampusResolver } from './campus.resolver';
import { CampusService } from './campus.service';

@Module({
  imports: [EnderecoModule, ModalidadeModule],
  controllers: [CampusController],
  providers: [CampusService, CampusResolver],
  exports: [CampusService],
})
export class CampusModule {}
