import { Module } from '@nestjs/common';
import { DatabaseContextModule } from './database-context';
import { TypeormModule } from './typeorm';

@Module({
  imports: [TypeormModule, DatabaseContextModule],
})
export class AdapterDatabaseModule {}
