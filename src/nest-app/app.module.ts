import { Module } from '@nestjs/common';
import { AdaptersModule } from './adapters';
import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

@Module({
  imports: [AdaptersModule],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
