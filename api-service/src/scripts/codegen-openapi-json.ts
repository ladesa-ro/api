#!/usr/bin/env tsx
import fs from "node:fs/promises";
import path from "node:path";
import { NestFactory } from "@nestjs/core";
import { SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "../app.module";
import { SetupSwaggerDocument } from "../infrastructure/integrations";

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
  const outFileDisplay = OUT_FILE;

  console.log(`> Gerando JSON "${outFileDisplay}" com a especificação OpenAPI/Swagger.`);

  await buildOpenApiFile();

  console.log("> Gerado com sucesso.");
}

bootstrap();
