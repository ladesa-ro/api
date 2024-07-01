#!/usr/bin/env bash

set -xe;

PATH_OUTDIR=$(pwd)

echo =====================================================
echo Codegen: OpenAPI JSON
echo =====================================================

echo "Building api-service..."
IMG_NAME=$(docker build ../.. -f ../../Dockerfile.service -q)
echo "Built with ref '${IMG_NAME}'"

echo "Running 'npm run gen:api' inside container..."
docker run --rm \
  -u 1000 \
  -v ${PATH_OUTDIR}/:/tmp/gen \
  -e OUT_FILE=/tmp/gen/generated.json \
  -it ${IMG_NAME} \
  npm run gen:openapi \
;

echo Done.

echo =====================================================
