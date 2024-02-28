import { Module } from '@nestjs/common';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [InfrastructureModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
