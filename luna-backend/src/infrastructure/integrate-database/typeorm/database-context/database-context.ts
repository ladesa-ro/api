import { DataSource, EntityManager } from 'typeorm';

export class DatabaseContext {
  constructor(readonly ds: DataSource | EntityManager) {}

  static new(ds: DataSource | EntityManager) {
    return new DatabaseContext(ds);
  }
}
