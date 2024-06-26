# api

## Ambientes

| Estágio         | Devops                                                       | URL                                                            |
| --------------- | ------------------------------------------------------------ | -------------------------------------------------------------- |
| Produção        | [![CI: Production][action-ci-prod-src]][action-ci-prod-href] | `não disponível`.                                              |
| Desenvolvimento | [![CI: Development][action-ci-dev-src]][action-ci-dev-href]  | <https://luna.sisgha.com/api>; <https://dev.ladesa.com.br/api> |

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

| Host            | Endereço         | Descrição               | Plataforma Base                   |
| --------------- | ---------------- | ----------------------- | --------------------------------- |
| `ladesa-api`    | `localhost:3701` | Aplicação NodeJS.       | `docker.io/library/node:22`       |
| `ladesa-api-db` | `localhost:5432` | Banco de dados postgres | `docker.io/bitnami/postgresql:15` |

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

[action-ci-prod-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci.yml?style=flat&logo=github&logoColor=white&label=CI@production&branch=production&labelColor=18181B
[action-ci-prod-href]: https://github.com/ladesa-ro/api/actions/workflows/ci.yml?query=branch%3Aproduction

<!-- Badges / Actions / Development  -->

[action-ci-dev-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci.yml?style=flat&logo=github&logoColor=white&label=CI@development&branch=development&labelColor=18181B
[action-ci-dev-href]: https://github.com/ladesa-ro/api/actions/workflows/ci.yml?query=branch%3Adevelopment
