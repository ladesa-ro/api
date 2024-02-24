import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { CoreBusinessModule } from './core-business/core.module';

@Module({
  imports: [InfrastructureModule, CoreBusinessModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
