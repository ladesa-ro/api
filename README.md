# Web API Integrada

## Ambientes

### Desenvolvimento

[![CI/CD Development][action-ci-cd-service-dev-src]][action-ci-cd-service-dev-href]

Instância 1: <https://dev.ladesa.com.br/api>.

#### Cliente JavaScript para o ambiente de desenvolvimento

[![NPM Package: @ladesa-ro/api-client-fetch][npm-package-alpha-src]][npm-package-alpha-href] [![NPM alpha version][npm-package-alpha-version-src]][npm-package-versions-href]

```sh
npm i @ladesa-ro/api-client-fetch@alpha
```

### Produção

[![CI/CD Production][action-ci-cd-service-prod-src]][action-ci-cd-service-prod-href]

#### Cliente JavaScript para o ambiente de produção

[![NPM Package: @ladesa-ro/api-client-fetch@latest][npm-package-latest-src]][npm-package-latest-href] [![NPM latest version][npm-package-latest-version-src]][npm-package-versions-href]

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

### Serviços do [api-service/.devops/development/docker-compose.yml](./api-service/.devops/development/docker-compose.yml)

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

<!-- Badges / Actions / Production  -->

[action-ci-cd-service-prod-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci-cd.yml?style=flat&logo=github&logoColor=white&label=CI%2FCD%20Service%20Production&branch=production&labelColor=18181B
[action-ci-cd-service-prod-href]: https://github.com/ladesa-ro/api/actions/workflows/ci.yml?query=branch%3Aproduction

<!-- Badges / Actions / Development / CI-CD-Service  -->

[action-ci-cd-service-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci-cd.yml?style=flat&logo=github&logoColor=white&label=CI%2FCD%20Service%20Development&branch=development&labelColor=18181B
[action-ci-cd-service-dev-href]: https://github.com/ladesa-ro/api/actions/workflows/ci-cd.yml?query=branch%3Adevelopment

<!-- Badges / Source Code  -->

<!-- Badges / Integrations / NPM -->

[npm-package-versions-href]: https://www.npmjs.com/package/@ladesa-ro/api-client-fetch?activeTab=versions

<!-- Badges / Integrations / NPM / Alpha -->

[npm-package-alpha-src]: https://img.shields.io/badge/npm-%40ladesa--ro%2Fapi--client--fetch@alpha-18181B?style=flat&logo=npm&logoColor=white&labelColor=%23CB3837
[npm-package-alpha-href]: https://npmjs.com/package/@ladesa-ro/api-client-fetch
[npm-package-alpha-version-src]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fregistry.npmjs.com%2F%40ladesa-ro%2Fapi-client-fetch&query=%24%5B%22dist-tags%22%5D.alpha&prefix=v&style=flat&logo=npm&logoColor=white&label=alpha&style=flat&colorA=18181B&colorB=F0DB4F

<!-- Badges / Integrations / NPM / Latest -->

[npm-package-latest-src]: https://img.shields.io/badge/npm-%40ladesa--ro%2Fapi--client--fetch@latest-18181B?style=flat&logo=npm&logoColor=white&labelColor=%23CB3837
[npm-package-latest-href]: https://npmjs.com/package/@ladesa-ro/api-client-fetch
[npm-package-latest-version-src]: https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fregistry.npmjs.com%2F%40ladesa-ro%2Fapi-client-fetch&query=%24%5B%22dist-tags%22%5D.latest&prefix=v&style=flat&logo=npm&logoColor=white&label=latest&style=flat&colorA=18181B&colorB=F0DB4F
