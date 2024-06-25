import { Module } from '@nestjs/common';
import { AdapterIdentityAndAccessModule } from '../../adapters/adapter-identity-and-access';
import { RequestActorService } from './request-actor.service';

@Module({
  imports: [AdapterIdentityAndAccessModule],
  providers: [RequestActorService],
  exports: [RequestActorService],
})
export class RequestActorModule {}
