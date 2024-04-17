# sisgea-endpoint

## Desenvolvimento

```sh
git clone https://github.com/sisgha/sisgea-endpoint.git;
cd sisgea-endpoint;
```

### Aplicação node.js

API nest.

### Serviços do [devops/development/docker-compose.yml](./devops/development/docker-compose.yml)

| Host                     | Endereço         | Descrição               | Plataforma Base                   |
| ------------------------ | ---------------- | ----------------------- | --------------------------------- |
| `sisgea-luna-backend`    | `localhost:3000` | Aplicação NodeJS.       | `docker.io/library/node:20`       |
| `sisgea-luna-backend-db` | `localhost:5432` | Banco de dados postgres | `docker.io/bitnami/postgresql:15` |

### Scripts Make

O projeto conta com um [arquivo make](./Makefile) que comporta scrips destinados ao desenvolvimento da aplicação.

```Makefile
dev-setup:
  # Configura o ambiente de deselvolvimento, como a criação da rede sisgea-net e os arquivos .env.
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
