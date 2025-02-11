# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Copia os arquivos de configuração do monorepo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Instala o PNPM globalmente
RUN npm install -g pnpm

# Copia a pasta do backend (api) para dentro da imagem
COPY api ./api

# Vai para o diretório do backend e instala as dependências
WORKDIR /app/api
RUN pnpm install

# Executa o build do projeto (assegure que o script "build" esteja definido no package.json do api)
RUN pnpm run build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app

# Instala ferramentas de compilação necessárias para módulos nativos (como bcrypt e sqlite3)
RUN apk add --no-cache make gcc g++ python3 sqlite sqlite-dev

# Copia os arquivos compilados do estágio anterior
COPY --from=builder /app/api/dist ./dist

# Copia o package.json do backend para instalar as dependências de produção
COPY --from=builder /app/api/package.json ./package.json

# Copia o arquivo de lock do monorepo (que está na raiz do builder)
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml

# Define a variável de ambiente para forçar a construção dos módulos nativos
ENV npm_config_build_from_source=true

# Instala o PNPM globalmente e instala as dependências de produção
RUN npm install -g pnpm && pnpm install --prod

# Opcional: Rebuild para garantir a compilação dos módulos nativos
RUN pnpm rebuild

# Copia a pasta de templates para que os arquivos HTML fiquem disponíveis
COPY --from=builder /app/api/src/template ./template

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main.js"]
