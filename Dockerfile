# Imagem base
FROM node:18

# Diretório de trabalho
WORKDIR /app

# Copiar arquivos
COPY package*.json ./
RUN npm install

COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Expor a porta da API
EXPOSE 3001

CMD ["npm", "run", "dev"]
