# Stellar Backend

Este es el backend de la aplicación Stellar, desarrollado con NestJS y Prisma ORM. Proporciona una API REST para la búsqueda de habitaciones y la gestión de reservas, además de manejar precios dinámicos basados en varios factores.

## Estructura del Proyecto

```bash
📁 stellar-backend
    📁 prisma
        📁 migrations           # Migraciones de Prisma
        ─ schema.prisma         # Definición del esquema de la base de datos
        ─ seed.ts               # Script para inicializar datos
    📁 src
        📁 helpers              # Funciones de ayuda
        📁 prisma               # Módulo Prisma
        📁 reservations         # Módulo de reservas
            📁 dto              # DTOs de reservas
        📁 rooms                # Módulo de habitaciones
            📁 dto              # DTOs de habitaciones
        📁 rules                # Módulo de reglas
            📁 dto              # DTOs de reglas
        📁 roomTypes            # Módulo de tipo de habitaciones
            📁 dto              # DTOs de tipo de habitaciones
        ─ app.controller.ts     # Controlador principal
        ─ app.module.ts         # Módulo raíz
        ─ main.ts               # Punto de entrada
    ─ .env                      # Variables de entorno
    ─ openapi.json              # Archivo generado por Swagger con la documentación de la API
    ─ package.json              # Dependencias y scripts de npm
    ─ tsconfig.json             # Configuración de TypeScript
```

## Instalación

### Requisitos Previos

- Node.js v18+
- PostgreSQL

### Configuración del Entorno

1. Clonar el repositorio:
    ```bash
    git clone git@github.com:3FE3LE/stellar-backend.git
    cd stellar-backend
    ```

2. Instalar las dependencias:
    ```bash
    npm install
    ```

3. Configurar la base de datos:
   - Crear un archivo `.env` basado en `.env.example` y configurar la URL de la base de datos:
     ```bash
     DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres"
     ```

4. Ejecutar las migraciones para preparar la base de datos:
    ```bash
    npx prisma migrate dev
    ```

5. Sembrar la base de datos con datos iniciales:
    ```bash
    npx ts-node prisma/seed.ts
    ```

## Ejecución

- Modo desarrollo:
  ```bash
  npm run start:dev
  ```

- Modo producción:
  ```bash
  npm run build
  npm run start:prod
  ```

## Documentación de la API

El servidor genera automáticamente un archivo `openapi.json` con la documentación de la API, que puedes importar en Postman o Swagger UI para explorar los endpoints.

## Scripts Principales

- **Iniciar en desarrollo**: `npm run start:dev`
- **Construir para producción**: `npm run build`
- **Iniciar en producción**: `npm run start:prod`
- **Ejecutar pruebas**: `npm run test`

## Testing

- **Pruebas unitarias**:
  ```bash
  npm run test
  ```

- **Pruebas e2e**:
  ```bash
  npm run test:e2e
  ```

## Dependencias

- **NestJS** - Framework para la construcción de aplicaciones escalables.
- **Prisma** - ORM para trabajar con PostgreSQL.
- **Swagger** - Generación automática de la documentación de la API.
- **RxJS** - Librería para manejar programación reactiva.

## Notas Adicionales

- Prisma está configurado para manejar las migraciones de esquema, y la base de datos se puede inicializar con datos utilizando el script `seed.ts`.
- El archivo `openapi.json` se genera automáticamente cuando se levanta el servidor.
