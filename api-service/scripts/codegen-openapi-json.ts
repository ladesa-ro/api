#!/usr/bin/env tsx

import fs from "node:fs/promises";
import path from "node:path";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { SetupSwaggerDocument } from "../dist/src/adapters/adapter-http/swagger/index.js";
import { AppModule } from "../dist/src/app.module.js";

const OUT_FILE = process.env.OUT_FILE ?? "/tmp/generated.json";

async function buildOpenApiJson() {
  const app = await NestFactory.create(AppModule, {
    preview: true,
    abortOnError: false,
    logger: false,
  });

  const prefix = process.env.API_PREFIX ?? "/";

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ["health"] });
  }

  const config = SetupSwaggerDocument();
  const document = SwaggerModule.createDocument(app, config.build());

  await app.close();

  return structuredClone(document);
}

async function buildOpenApiFile() {
  const document = await buildOpenApiJson();
  const stringified = JSON.stringify(document, null, 2);

  await fs.mkdir(path.dirname(OUT_FILE), { recursive: true });
  await fs.writeFile(OUT_FILE, stringified);
}

async function bootstrap() {
  // const outFileDisplay = path.relative(process.cwd(), OUT_FILE);
  const outFileDisplay = OUT_FILE;

  console.log(`> Gerando JSON "${outFileDisplay}" com a especificação OpenAPI/Swagger.`);

  await buildOpenApiFile();

  console.log("> Gerado com sucesso.");
}

bootstrap();
