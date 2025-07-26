# 🛒 ELYTECH E-Commerce

<div align="center">
  <img src="https://img.shields.io/badge/Status-MVP-blue" alt="Status">
  <img src="https://img.shields.io/badge/Version-1.0.0-green" alt="Version">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="License">
</div>

> **Una plataforma de e-commerce moderna y escalable desarrollada por ELYTECH SOFTWARE AND SOLUTIONS**

## 📋 Descripción

ELYTECH E-Commerce es una solución completa de comercio electrónico diseñada como MVP (Minimum Viable Product) para demostrar capacidades técnicas y servir como base para futuros desarrollos comerciales. La aplicación implementa las funcionalidades esenciales de un e-commerce moderno con arquitectura escalable y buenas prácticas de desarrollo.

### ✨ Características principales

- 🏪 **Gestión completa de productos** - CRUD con categorías y variantes
- 🛍️ **Carrito de compras inteligente** - Persistencia y cálculos automáticos
- 💳 **Procesamiento de pagos** - Integración con Stripe
- 👤 **Sistema de usuarios** - Autenticación y perfiles
- 📱 **Diseño responsivo** - Optimizado para todos los dispositivos
- 🔍 **Búsqueda y filtrado** - Encuentra productos fácilmente

## 🏗️ Arquitectura del proyecto

```
ecommerce-nest-react-vite/
├── backend/          # API REST con NestJS
│   ├── src/
│   ├── prisma/       # Esquemas de base de datos
│   └── package.json
├── frontend/         # Aplicación React + Vite
│   ├── src/
│   ├── public/
│   └── package.json
└── README.md
```

## 🚀 Stack tecnológico

### Backend (API REST)
- **Framework:** NestJS + TypeScript
- **Base de datos:** PostgreSQL
- **ORM:** Prisma
- **Pagos:** Stripe API
- **Validación:** Class-validator, Class-transformer
- **Arquitectura:** Modular, DTOs, Guards, Interceptors

### Frontend
- **Framework:** React 18 + Vite
- **Enrutamiento:** React Router v6
- **HTTP Client:** Axios
- **Estilos:** CSS
- **Estado:** React useState

### DevOps & Herramientas
- **Versionado:** Git + GitHub
- **Package Manager:** npm
- **Linting:** ESLint + Prettier
- **Testing:** Jest (backend), Vitest (frontend)

## ⚡ Instalación y configuración

### Prerrequisitos
- Node.js >= 18.0.0
- PostgreSQL >= 14
- npm >= 8.0.0
- Cuenta de Stripe (para pagos)

### 1. Clonar el repositorio
```bash
git clone [[https://github.com/tuusuario/elytech-ecommerce.git](https://github.com/wildbergerlopezk/ecommerce-nest-react-vite)](https://github.com/wildbergerlopezk/ecommerce-nest-react-vite.git)
cd elytech-ecommerce
```

### 2. Configurar Backend
```bash
cd backend
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de BD y Stripe

# Configurar base de datos
npx prisma generate
npx prisma db push
npx prisma db seed (opcional)

# Iniciar servidor de desarrollo
npm run start:dev
```

El backend estará disponible en: `http://localhost:3000`

### 3. Configurar Frontend
```bash
cd ../frontend
npm install

# Configurar variables de entorno
cp .env.example .env
# Configurar URL del backend

# Iniciar aplicación
npm run dev
```

El frontend estará disponible en: `http://localhost:5173`

## 🔧 Variables de entorno requeridas

### Backend (.env)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="tu_jwt_secret_super_seguro"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
PORT=3000
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLIC_KEY=pk_test_...
```

## 📚 API Endpoints

### 🏠 General
- `GET /` - Health check de la aplicación

### 👤 Usuarios
- `POST /users` - Crear nuevo usuario
- `GET /users` - Listar usuarios (admin)
- `GET /users/:id` - Obtener usuario específico
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

### 🔐 Autenticación
- `POST /auth/login` - Iniciar sesión

### 🏷️ Categorías
- `POST /categories` - Crear categoría
- `GET /categories` - Listar categorías
- `GET /categories/:id` - Obtener categoría por ID
- `GET /categories/slug/:slug` - Obtener categoría por slug
- `PATCH /categories/:id` - Actualizar categoría por ID
- `PATCH /categories/slug/:slug` - Actualizar categoría por slug
- `DELETE /categories/:id` - Eliminar categoría por ID
- `DELETE /categories/slug/:slug` - Eliminar categoría por slug

### 🏷️ Subcategorías
- `POST /subcategories` - Crear subcategoría
- `GET /subcategories` - Listar subcategorías
- `GET /subcategories/:id` - Obtener subcategoría por ID
- `GET /subcategories/slug/:slug` - Obtener subcategoría por slug
- `PATCH /subcategories/:id` - Actualizar subcategoría por ID
- `PATCH /subcategories/slug/:slug` - Actualizar subcategoría por slug
- `DELETE /subcategories/:id` - Eliminar subcategoría por ID
- `DELETE /subcategories/slug/:slug` - Eliminar subcategoría por slug

### 📦 Productos
- `GET /products` - Listar productos
- `GET /products/:id` - Obtener producto por ID
- `GET /products/slug/:slug` - Obtener producto por slug
- `POST /products` - Crear producto
- `PATCH /products/:id` - Actualizar producto por ID
- `PATCH /products/slug/:slug` - Actualizar producto por slug
- `DELETE /products/:id` - Eliminar producto por ID
- `DELETE /products/slug/:slug` - Eliminar producto por slug

### 🔍 Búsqueda
- `GET /search` - Buscar productos y categorías

### 🛒 Carrito
- `POST /cart` - Agregar item al carrito
- `GET /cart` - Obtener carrito del usuario
- `PATCH /cart/:id` - Actualizar item del carrito
- `DELETE /cart/:id` - Remover item del carrito

### 📋 Órdenes
- `POST /orders/create-from-cart` - Crear orden desde carrito
- `GET /orders` - Listar órdenes del usuario
- `GET /orders/:id` - Obtener orden específica
- `PATCH /orders/update-status` - Actualizar estado de orden

### 💳 Pagos (Stripe)
- `POST /payments/checkout` - Crear sesión de checkout
- `GET /payments/success` - Página de éxito de pago
- `GET /payments/cancel` - Página de cancelación de pago
- `POST /payments/webhook` - Webhook de Stripe

## 🧪 Testing

### Backend
```bash
cd backend
npm run start
```

### Frontend
```bash
cd frontend
npm run dev
```

## 🚀 Deployment

### Preparación para producción
```bash
# Backend
cd backend
npm run build

# Frontend
cd frontend
npm run build
```

### Sugerencias de hosting
- **Backend:** Railway, Heroku, AWS, DigitalOcean
- **Frontend:** Vercel, Netlify, GitHub Pages
- **Base de datos:** Railway PostgreSQL, Supabase, AWS RDS

## 🤝 Contribución

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📈 Roadmap

- [ ] Implementar sistema de reviews y ratings
- [ ] Añadir notificaciones push
- [ ] Dashboard de analytics avanzado
- [ ] Integración con más gateways de pago
- [ ] App móvil con React Native
- [ ] Sistema de cupones y descuentos
- [ ] Integración con redes sociales

## 🐛 Reportar problemas

Si encuentras algún bug o tienes sugerencias, por favor:
1. Revisa los [issues existentes]([https://github.com/tuusuario/elytech-ecommerce/issues](https://github.com/wildbergerlopezk/ecommerce-nest-react-vite))
2. Crea un nuevo issue con una descripción detallada
3. Incluye pasos para reproducir el problema

## 📄 Licencia

Este proyecto es de uso libre

## ⚠️ Disclaimer

Este software se proporciona "tal como está", sin garantías de ningún tipo, expresas o implícitas. El autor no se hace responsable por cualquier uso indebido, daño o consecuencia derivada del uso de este software.

## 👨‍💻 Autor

**Kevin Olaf Wildberger López**
- 🏢 Fundador de ELYTECH SOFTWARE AND SOLUTIONS
- 💼 Desarrollador Full Stack | Emprendedor 
- 🎓 Estudiante de Ingeniería Informática
- 🌐 [LinkedIn]([www.linkedin.com/in/kevin-olaf-wildberger-lópez-2a25a3186](https://www.linkedin.com/in/kevin-olaf-wildberger-lópez-2a25a3186)) 

---

<div align="center">
  <p>⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub</p>
  <p>Desarrollado con ❤️ por ELYTECH SOFTWARE AND SOLUTIONS</p>
</div>
<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/0954497f-cf33-4935-acf1-31f087dc3426" />
<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/fcc4ef74-7c11-469a-ac78-d814b6618425" />
<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/ee62ae30-7ec2-417a-b30d-2131f1e2da9b" />
<img width="1360" height="768" alt="image" src="https://github.com/user-attachments/assets/353a9040-c6d2-45c0-8e67-886dad1ebc6b" />

