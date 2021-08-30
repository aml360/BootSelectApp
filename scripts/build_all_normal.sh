#!/bin/bash
GO_TO=$(dirname "$0")
cd $GO_TO

cd ../BackEnd
mv .env .envDev && mv .envProd .env

pnpm i && pnpm run build && DOCKER_BUILDKIT=1 docker buildx build -t bootselectbackend --load --platform linux/arm64/v8 . &
cd ../FrontEnd && pnpm i &&  pnpm run build:prod &
wait

mv .env .envProd && mv .envDev .env

