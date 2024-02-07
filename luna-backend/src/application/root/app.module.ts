import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from '../../infrastructure/environment-config';
import { TypeormModule } from '../../infrastructure/integrate-database/typeorm/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //
    EnvironmentConfigModule,
    TypeormModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
