FROM node:18-alpine
LABEL Developers="Vladislav Smelko, Roope Sinisalo, Wilma Komu"

WORKDIR /app
COPY . .
# clean install dependencies and build
RUN npm ci
RUN npm run build

# Delete source code files that were used to build the app that are no longer needed
RUN rm -rf src/ static/ emailTemplates/ docker-compose.yml

# The USER instruction sets the user name to use as the default user for the remainder of the current stage
USER node:node

ENTRYPOINT ["node", "build/index.js"]
