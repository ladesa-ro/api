import { Module } from '@nestjs/common';
import { EnderecoModule } from '../endereco/endereco.module';
import { CampusController } from './campus.controller';
import { CampusResolver } from './campus.resolver';
import { CampusService } from './campus.service';

@Module({
  imports: [EnderecoModule],
  controllers: [CampusController],
  providers: [CampusService, CampusResolver],
  exports: [CampusService],
})
export class CampusModule {}
