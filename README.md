# api

## Ambientes

| Estágio         | Devops                                                                               | URL                                                             |
| --------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- |
| Produção        | [![CI/CD Production][action-ci-cd-service-prod-src]][action-ci-cd-service-prod-href] | `não disponível`.                                               |
| Desenvolvimento | [![CI/CD Development][action-ci-cd-service-dev-src]][action-ci-cd-service-dev-href]  | <https://luna.sisgha.com/api>; <https://dev.ladesa.com.br/api>; |

## Clientes

### JavaScript

[![NPM Package][npm-package-src]][npm-package-href] [![NPM Package Source Code][source-code-src]][source-npm-href] [![NPM latest version][npm-package-latest-version-src]][npm-package-versions-href]
[![NPM alpha Version][npm-package-alpha-version-src]][npm-package-versions-href]

## Configuração Local

### Obter o código fonte do projeto

```bash
git clone https://github.com/ladesa-ro/api.git
cd api
```

## `api-service`

```bash
cd api-service
```

### Serviços do [api-service/.devops/development/docker-compose.yml](./api-service/.devops/development/docker-compose.yml)

| Host            | Endereço         | Descrição                | Plataforma Base                   |
| --------------- | ---------------- | ------------------------ | --------------------------------- |
| `ladesa-api`    | `localhost:3701` | Aplicação NodeJS.        | `docker.io/library/node:22`       |
| `ladesa-api-db` | `localhost:5432` | Banco de dados postgres. | `docker.io/bitnami/postgresql:15` |

### Scripts Make

O projeto conta com um [arquivo make](./api-service/Makefile) que comporta scrips destinados ao desenvolvimento da aplicação.

#### `dev-setup`

```sh
make dev-setup; # Configura o ambiente de deselvolvimento, como a criação da rede ladesa-net e os arquivos .env.

```

#### `dev-up`

```sh
make dev-up; # Inicia os containers docker.
```

#### `dev-shell`

```sh
make dev-shell; # Inicia os containers docker e abre o bash na aplicação node.
```

- Após este processo, talvez você queira executar dentro do shell do container:

  ```sh
  npm install;
  ```

  ```sh
  npm run start:dev;
  ```

#### `dev-down`

```sh
make dev-down; # Para todos os containers.
```

#### `dev-cleanup`

```sh
make dev-cleanup; # Para todos os containers e remove os containers e volumes associados.
```

#### `dev-logs`

```sh
make dev-logs; # Mostra os registros dos containers
```

## Licença

[MIT - Ladesa e Colaboradores, 2024](./LICENSE).

[MIT - Gabriel R. Antunes, 2024](./LICENSE).

<!-- Links -->

<!-- Badges -->

<!-- Badges / Actions / Production  -->

[action-ci-cd-service-prod-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci-cd.yml?style=flat&logo=github&logoColor=white&label=CI%2FCD%20Service%20Production&branch=production&labelColor=18181B
[action-ci-cd-service-prod-href]: https://github.com/ladesa-ro/api/actions/workflows/ci.yml?query=branch%3Aproduction

<!-- Badges / Actions / Development / CI-CD-Service  -->

[action-ci-cd-service-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci-cd.yml?style=flat&logo=github&logoColor=white&label=CI%2FCD%20Service%20Development&branch=development&labelColor=18181B
[action-ci-cd-service-dev-href]: https://github.com/ladesa-ro/api/actions/workflows/ci-cd.yml?query=branch%3Adevelopment

<!-- Badges / Source Code  -->

[source-code-src]: https://img.shields.io/badge/repo-GitHub-white?style=flat&logo=git&logoColor=white&labelColor=%2318181B
[source-npm-href]: https://github.com/ladesa-ro/api/tree/development/integrations/npm/api-client-fetch

<!-- Badges / Integrations / NPM -->

[npm-package-src]: https://img.shields.io/badge/npm-%40ladesa--ro%2Fapi--client--fetch-18181B?style=flat&logo=npm&logoColor=white&labelColor=%23CB3837
[npm-package-href]: https://npmjs.com/package/@ladesa-ro/api-client-fetch

<!-- Badges / Integrations / NPM / Versions -->

[npm-package-versions-href]: https://www.npmjs.com/package/@ladesa-ro/api-client-fetch?activeTab=versions
[npm-package-latest-version-src]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fregistry.npmjs.com%2F%40ladesa-ro%2Fapi-client-fetch&query=%24%5B%22dist-tags%22%5D.latest&prefix=v&style=flat&logo=npm&logoColor=white&label=stable&style=flat&colorA=18181B&colorB=F0DB4F
[npm-package-alpha-version-src]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fregistry.npmjs.com%2F%40ladesa-ro%2Fapi-client-fetch&query=%24%5B%22dist-tags%22%5D.alpha&prefix=v&style=flat&logo=npm&logoColor=white&label=alpha&style=flat&colorA=18181B&colorB=F0DB4F
