#!/usr/bin/env bash

set -xe;

(cd ../api-service; npm run build;);
(cd ./npm/api-client-fetch; npm run build;);

# docker run --rm \
#   -u 1000 \
#   -v ${PWD}:/local openapitools/openapi-generator-cli generate \
#   -i /local/openapi-json/openapi-json.json \
#   -g typescript-fetch \
#   -o /local/npm/typescript-fetch