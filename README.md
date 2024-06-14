# api

[![CI][action-ci-src]][action-ci-href]

## Desenvolvimento

```sh
git clone https://github.com/ladesa-ro/api.git;
cd api;
```

### Aplicação node.js

API nest.

### Serviços do [.devops/development/docker-compose.yml](./.devops/development/docker-compose.yml)

| Host            | Endereço         | Descrição               | Plataforma Base                   |
| --------------- | ---------------- | ----------------------- | --------------------------------- |
| `ladesa-api`    | `localhost:3701` | Aplicação NodeJS.       | `docker.io/library/node:22`       |
| `ladesa-api-db` | `localhost:5432` | Banco de dados postgres | `docker.io/bitnami/postgresql:15` |

### Scripts Make

O projeto conta com um [arquivo make](./Makefile) que comporta scrips destinados ao desenvolvimento da aplicação.

```Makefile
dev-setup:
  # Configura o ambiente de deselvolvimento, como a criação da rede ladesa-net e os arquivos .env.
dev-up:
  # Inicia os containers docker.
dev-shell:
  # Inicia os containers docker e abre o bash na aplicação node.
dev-down:
  # Para todos os containers.
dev-cleanup:
  # Para todos os containers e remove os containers e volumes associados.
dev-logs:
  # Mostra os registros dos containers
```

### Aplicação nest/nodejs

```bash
npm install
```

#### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Licença

[MIT - Ladesa e Colaboradores, 2024](./LICENSE).

[MIT - Gabriel R. Antunes, 2024](./LICENSE).


<!-- Badges -->

<!-- Badges / Actions  -->

[action-ci-src]: https://img.shields.io/github/actions/workflow/status/ladesa-ro/api/ci.yml?style=flat&logo=github&logoColor=white&label=CI&labelColor=18181B&color=F0DB4F
[action-ci-href]: https://github.com/ladesa-ro/api/actions/workflows/ci.yml
