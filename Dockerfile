# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS builder

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias necesarias
RUN npm install --legacy-peer-deps

# Copiar el resto de los archivos del proyecto
COPY . .

# Generar el archivo de cliente de Prisma
RUN npx prisma generate

# Compilar la aplicación
RUN npm run build

# Etapa 2: Preparación de la imagen final
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar las dependencias de la etapa de construcción
COPY --from=builder /app/node_modules ./node_modules

# Copiar el código construido desde la etapa anterior
COPY --from=builder /app/dist ./dist

# Copiar los archivos necesarios de prisma (incluyendo el esquema)
COPY --from=builder /app/prisma ./prisma

# Copiar el archivo de OpenAPI generado
COPY --from=builder /app/openapi.json ./openapi.json

# Exponer el puerto en el que se ejecutará la aplicación (por defecto: 3000)
EXPOSE 3000

# Comando de inicio para la aplicación
CMD ["node", "dist/main"]

