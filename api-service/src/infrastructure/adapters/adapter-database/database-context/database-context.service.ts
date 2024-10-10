import { Inject, Injectable } from "@nestjs/common";
import { DataSource } from "typeorm";
import { APP_DATA_SOURCE_TOKEN } from "../typeorm/providers/app-data-source.provider";
import { DatabaseContextCore } from "./core/database-context.core";

@Injectable()
export class DatabaseContextService extends DatabaseContextCore {
  constructor(
    @Inject(APP_DATA_SOURCE_TOKEN)
    readonly ds: DataSource,
  ) {
    super(ds);
  }
}
