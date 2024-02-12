import { Module } from '@nestjs/common';
import { CampusController } from './campus.controller';
import { CampusResolver } from './campus.resolver';
import { CampusService } from './campus.service';

@Module({
  imports: [],
  controllers: [CampusController],
  providers: [CampusService, CampusResolver],
  exports: [CampusService],
})
export class CampusModule {}
