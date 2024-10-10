import { AdapterIdentityAndAccessModule } from "@/infrastructure/adapters/adapter-identity-and-access";
import { Module } from "@nestjs/common";
import { RequestActorService } from "./request-actor.service";

@Module({
  imports: [AdapterIdentityAndAccessModule],
  providers: [RequestActorService],
  exports: [RequestActorService],
})
export class RequestActorModule {}
