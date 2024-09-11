
d_network=ladesa-net
d_container_app=ladesa-api

compose_options=--file .devops/development/docker-compose.yml -p ladesa-api

setup:
	$(shell (cd .devops/development; find . -type f -name "*.example" -exec sh -c 'cp -n {} $$(basename {} .example)' \;))
	$(shell (bash -c "docker network create $(d_network) &>/dev/null"))

up:
	make setup;
	# --force-recreate
	docker compose $(compose_options) up --remove-orphans -d; 

start:
	make setup;

	make down;
	make up;

	docker compose $(compose_options) \
		exec \
		-u node \
		--no-TTY \
		-d $(d_container_app) \
			bash -c "npm i && npm run migration:run && npm run start:dev" \&;

logs:
	make setup;
	docker compose $(compose_options) logs -f;

shell:
	make setup;
	make up;
	docker compose $(compose_options) exec $(d_container_app) bash;

shell-root:
	make setup;
	make up;
	docker compose $(compose_options) exec -u root $(d_container_app) bash;

stop:
	make setup;
	docker compose $(compose_options) stop;

down:
	make setup;
	docker compose $(compose_options) down --remove-orphans;

cleanup:
	docker compose $(compose_options) down --remove-orphans -v;