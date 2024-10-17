# Web API Integrada

[![CI/CD Release][action-release-src]][action-release-href]

## Ambientes

### Desenvolvimento

Instância 1: <https://dev.ladesa.com.br/api>.

#### Cliente JavaScript para o ambiente de desenvolvimento

[![NPM Package: @ladesa-ro/api-client-fetch alpha version][npm-package-alpha-version-src]][npm-package-versions-href]

```sh
npm i @ladesa-ro/api-client-fetch@alpha
```

### Produção

#### Cliente JavaScript para o ambiente de produção

[![NPM Package: @ladesa-ro/api-client-fetch latest version][npm-package-latest-version-src]][npm-package-versions-href]

```sh
npm i @ladesa-ro/api-client-fetch@latest
```

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

### Serviços do [docker-compose.yml](./docker-compose.yml)

| Host            | Endereço         | Descrição                | Plataforma Base                   |
| --------------- | ---------------- | ------------------------ | --------------------------------- |
| `ladesa-api`    | `localhost:3701` | Aplicação NodeJS.        | `docker.io/library/node:22`       |
| `ladesa-api-db` | `localhost:5432` | Banco de dados postgres. | `docker.io/bitnami/postgresql:15` |

### Scripts Make

O projeto conta com um [arquivo make](./api-service/Makefile) que comporta scrips destinados ao desenvolvimento da aplicação.

#### `setup`

```sh
make setup; # Configura o ambiente de deselvolvimento, como a criação da rede ladesa-net e os arquivos .env.

```

#### `up`

```sh
make up; # Inicia os containers docker.
```

#### `shell`

```sh
make shell; # Inicia os containers docker e abre o bash na aplicação node.
```

- Após este processo, talvez você queira executar dentro do shell do container:

```sh
pnpm install;

```

```sh
pnpm run start:dev;
```

#### `down`

```sh
make down; # Para todos os containers.
```

#### `cleanup`

```sh
make cleanup; # Para todos os containers e remove os containers e volumes associados.
```

#### `logs`

```sh
make logs; # Mostra os registros dos containers
```

## Licença

[MIT](./LICENSE) © 2024 – presente, Ladesa.

<!-- Links -->

<!-- Badges -->

<!-- Badges / Actions / Release  -->

[action-release-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/release.yml?style=flat&logo=github&logoColor=white&label=CI/CD%20Release&branch=development&labelColor=18181B
[action-release-href]: https://github.com/ladesa-ro/api/actions/workflows/release.yml?query=branch%3Adevelopment

<!-- Badges / Source Code  -->

<!-- Badges / Integrations / NPM -->

[npm-package-versions-href]: https://www.npmjs.com/package/@ladesa-ro/api-client-fetch?activeTab=versions

<!-- Badges / Integrations / NPM / Alpha -->

[npm-package-alpha-version-src]: https://img.shields.io/badge/dynamic/json?url=https://registry.npmjs.com/@ladesa-ro/api-client-fetch&query=$[%22dist-tags%22].alpha&prefix=v&style=flat&logo=npm&logoColor=white&label=%40ladesa-ro%2Fapi-client-fetch@alpha&labelColor=%23CB3837&style=flat&colorA=18181B&colorB=ffffff

<!-- Badges / Integrations / NPM / Latest -->

[npm-package-latest-version-src]: https://img.shields.io/badge/dynamic/json?url=https://registry.npmjs.com/@ladesa-ro/api-client-fetch&query=$[%22dist-tags%22].latest&prefix=v&style=flat&logo=npm&logoColor=white&label=%40ladesa-ro%2Fapi-client-fetch@latest&labelColor=%23CB3837&style=flat&colorA=18181B&colorB=ffffff
