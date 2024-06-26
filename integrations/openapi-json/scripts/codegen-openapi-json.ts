#!/usr/bin/env tsx

import fs from 'node:fs/promises';
import path from 'node:path';
import { SetupSwaggerDocument } from '../../../api-service/dist/adapters/adapter-http/swagger/index.js';
import { AppModule } from '../../../api-service/dist/app.module.js';
import { NestFactory } from '../../../api-service/node_modules/@nestjs/core';
import { SwaggerModule } from '../../../api-service/node_modules/@nestjs/swagger';

const paths = {
  get here() {
    return __dirname;
  },

  workspace: {
    get dir() {
      return path.join(paths.here, '../../..');
    },

    integrations: {
      get dir() {
        return path.join(paths.workspace.dir, 'integrations');
      },

      openApiJson: {
        get dir() {
          return path.join(paths.workspace.integrations.dir, 'openapi-json');
        },

        files: {
          get spec() {
            return path.join(paths.workspace.integrations.openApiJson.dir, 'out/openapi-spec.json');
          },
        },
      },
    },
  },
};

async function buildOpenApiJson() {
  const app = await NestFactory.create(AppModule, {
    preview: true,
    abortOnError: false,
    logger: false,
  });

  const prefix = process.env.API_PREFIX ?? '/';

  if (prefix) {
    app.setGlobalPrefix(prefix, { exclude: ['health'] });
  }

  const config = SetupSwaggerDocument();
  const document = SwaggerModule.createDocument(app, config.build());

  app.close();

  return structuredClone(document);
}

async function buildOpenApiFile() {
  const document = await buildOpenApiJson();
  const stringified = JSON.stringify(document, null, 2);

  await fs.mkdir(paths.workspace.integrations.openApiJson.dir, { recursive: true });
  await fs.writeFile(paths.workspace.integrations.openApiJson.files.spec, stringified);
}

async function bootstrap() {
  console.log(`> Gerando JSON "${path.relative(process.cwd(), paths.workspace.integrations.openApiJson.files.spec)}" com a especificação OpenAPI/Swagger.`);

  await buildOpenApiFile();

  console.log('> Gerado com sucesso.');
}

bootstrap();
