FROM node:18.17.0-alpine
WORKDIR /app
# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 3000

CMD npm run dev
