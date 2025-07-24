
---

### 📁 `frontend/README.md`

```markdown
# 💻 Frontend - E-commerce

Este es el frontend de un sistema e-commerce desarrollado con **React**, que consume la API creada en NestJS. Incluye una interfaz moderna, responsiva y funcional con integración completa del flujo de compra.

## 🧰 Tecnologías utilizadas

- React
- TypeScript
- Vite
- React Router
- CSS
- Axios
- Stripe JS
- useState (gestión de estado nativo de react)

## 🚀 Funcionalidades

- Listado de productos por categoría y subcategoría
- Página de detalle del producto
- Carrito de compras persistente
- Flujo de orden y pago
- Conexión con backend NestJS vía API

## ⚙️ Instalación

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd frontend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env con tus variables (por ejemplo: VITE_API_URL)
cp .env.example .env

# 4. Iniciar el servidor de desarrollo
npm run dev
