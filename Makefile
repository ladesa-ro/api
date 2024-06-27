build-service-image:
	docker build . -f Dockerfile.service

generate-openapi-json:
	docker run --rm \
		-v ${PWD}/integrations/openapi-json:/tmp/gen \
		-e OUT_FILE=/tmp/gen/generated.json \
		-it ${shell docker build . -f Dockerfile.service -q} \
		npm run gen:openapi