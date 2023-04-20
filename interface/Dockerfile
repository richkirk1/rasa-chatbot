#Stage 1
FROM node:latest as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install react-scripts
COPY . .
RUN npm run build

#Stage 2
FROM httpd:2.4
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/
