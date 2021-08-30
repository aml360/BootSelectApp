#!/bin/bash
GO_TO=$(dirname "$0")
cd $GO_TO

cd ../BackEnd
mv .env .envDev && mv .envProd .env
docker build -t bootselectbackend .
# DOCKER_BUILDKIT=1 docker buildx build -t bootselectbackend --load --platform linux/arm64/v8 . &
mv .env .envProd && mv .envDev .env
