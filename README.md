# ✅ Frontend – Interfaz Web para API REST

Interfaz de usuario desarrollada con **React**, diseñada para consumir una API REST protegida con **JWT** y **OAuth2**, brindando una experiencia moderna, segura y responsiva. Incluye rutas protegidas, validaciones de formularios, manejo global de estado, integración con el backend y despliegue en AWS con CloudFront y S3.

---

## 1️⃣ Tecnologías y Herramientas

| Tecnología / Herramienta | Uso                                                      |
| ------------------------ | -------------------------------------------------------- |
| `React`                  | Biblioteca principal para construir la UI                |
| `Vite`                   | Bundler moderno para desarrollo rápido                   |
| `Tailwind CSS`           | Framework utilitario para estilos modernos y responsivos |
| `JavaScript (ES6+)`      | Lenguaje base del proyecto                               |
| `HTML5 + CSS3`           | Estructura y estilos básicos                             |
| `Axios`                  | Cliente HTTP para consumir la API REST                   |
| `React Router`           | Navegación entre vistas y rutas protegidas               |
| `Context API`            | Manejo de estado global (usuario, autenticación)         |
| `ESLint + Prettier`      | Formato y estilo de código consistente                   |
| `AWS S3 + CloudFront`    | Despliegue estático, entrega global y segura con HTTPS   |

---

## 2️⃣ Funcionalidades del Proyecto

- ✔️ Login y registro de usuarios usando JWT
- ✔️ Consumo completo de la API REST desarrollada en Spring Boot
- ✔️ Control de acceso por roles (`admin`, `user`)
- ✔️ Rutas protegidas para vistas seguras (`/dashboard`, etc.)
- ✔️ Interfaz moderna y responsiva con Tailwind CSS
- ✔️ Formularios con validación y feedback visual
- ✔️ Funcionalidades CRUD (crear, leer, actualizar, eliminar usuarios)
- ✔️ Manejo visual de errores y respuestas del servidor
- ✔️ Notificaciones de éxito y error para acciones importantes
- ✔️ Navegación intuitiva y experiencia fluida

---

## 📂 Estructura del proyecto (resumen)

```bash
src/
├── api/                  # URLs y configuración de Axios
│   ├── apiUrls.js
│   └── axiosInstance.js
├── assets/               # Archivos estáticos como logos
│   └── react.svg
├── components/           # Componentes reutilizables
│   ├── Dashboard/
│   │   ├── CreateUser.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DeleteUser.jsx
│   │   ├── PanelHeader.jsx
│   │   ├── SearchUser.jsx
│   │   ├── UpdateUser.jsx
│   │   └── UserTableModal.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── context/              # Manejo de estado global
│   └── AuthContext.jsx
├── routes/               # Rutas protegidas
│   └── ProtectedRoutes.jsx
├── services/             # Servicios para consumir la API
│   ├── AuthService.js
│   ├── GeminiService.js
│   └── UserService.js
├── utils/                # Funciones auxiliares
│   ├── jwtUtils.js
│   └── navigateHelper.js
├── App.jsx               # Enrutamiento principal
├── index.css             # Estilos globales
├── main.jsx              # Punto de entrada de la app
```

---

## 🚀 Cómo ejecutar el proyecto

### 🔧 Requisitos

- Node.js 18+
- npm 9+ o yarn
- Vite

### ▶️ Instalación y ejecución local

```bash
npm install
npm run dev
```

La aplicación estará disponible en:

```
http://localhost:5173
```

---

## ☁️ Despliegue en Producción

El proyecto fue desplegado en **AWS S3** como sitio estático y distribuido globalmente con **CloudFront**, incluyendo:

- HTTPS habilitado con certificado SSL
- Redirección automática a `index.html` para rutas internas
- Integración con API Gateway y backend Spring Boot desplegado en EC2

![Diagram-Api-REST-JWT drawio (4)](https://github.com/user-attachments/assets/fce21920-6f70-4e2f-98a5-fae62ae1054a)
