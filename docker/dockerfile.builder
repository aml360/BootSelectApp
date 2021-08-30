# Node modified which have pnpm installed
FROM node:alpine
RUN npm i -g pnpm && \
	pnpm config set shamefully-hoist=true
WORKDIR /builder
CMD []
ENTRYPOINT []

