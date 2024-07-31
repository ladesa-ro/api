#!/usr/bin/env bash

echo =====================================================
echo Codegen: NPM api client fetch
echo =====================================================

pnpm run generate;
pnpm run build;

# docker run --rm \
#   -u 1000 \
#   -v ${PWD}:/local openapitools/openapi-generator-cli generate \
#   -i /local/openapi-json/openapi-json.json \
#   -g typescript-fetch \
#   -o /local/npm/typescript-fetch

echo =====================================================
