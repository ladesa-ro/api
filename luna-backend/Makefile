dev-setup:

	$(shell (cd devops/development; find . -type f -name "*.example" -exec sh -c 'cp -n {} $$(basename {} .example)' \;))

	$(shell (bash -c "sudo docker network create sisgea-luna-net &>/dev/null"))

dev-up:
	make dev-setup;
	sudo docker compose --file devops/development/docker-compose.yml -p sisgea-luna-backend up -d --remove-orphans;

dev-shell:
	make dev-up;
	sudo docker compose --file devops/development/docker-compose.yml -p sisgea-luna-backend exec sisgea-luna-backend bash;

dev-down:
	sudo docker compose --file devops/development/docker-compose.yml -p sisgea-luna-backend stop

dev-logs:
	sudo docker compose --file devops/development/docker-compose.yml -p sisgea-luna-backend logs -f


dev-start:
	make dev-down;
	make dev-up;

	sudo docker compose --file devops/development/docker-compose.yml -p sisgea-luna-backend exec -u node --no-TTY -d sisgea-luna-backend bash -c "npm i && npm run db:migrate && npm run start:dev" \&;
