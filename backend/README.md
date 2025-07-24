# 🛠️ Backend - E-commerce API

Este es el backend de un sistema de e-commerce desarrollado con **NestJS** y **PostgreSQL**, siguiendo principios sólidos de arquitectura y buenas prácticas de validación, rutas limpias y servicios desacoplados.

## 🧰 Tecnologías utilizadas

- NestJS
- Prisma ORM
- PostgreSQL
- JWT (para autenticación)
- Stripe (para pagos)

## 🚀 Funcionalidades

- CRUD de categorías, subcategorías y productos
- Gestión de imágenes
- Carrito de compras con flujo de orden y pagos
- Integración con Stripe
- Usuarios, autenticación y autorización

## 📦 Instalación

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd backend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env con tus configuraciones
cp .env.example .env

# 4. Ejecutar el proyecto
npm run start:dev
