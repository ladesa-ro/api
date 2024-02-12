import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusService } from './campus.service';
import { CampusResolver } from './estado.resolver';

@Module({
  imports: [],
  controllers: [CampusController],
  providers: [CampusService, CampusResolver],
  exports: [CampusService],
})
export class CampusModule {}
