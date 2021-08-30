npm run build
mv .env .envDev && mv .envProd .env
docker build -t bootselectbackend .
mv .env .envProd && mv .envDev .env

