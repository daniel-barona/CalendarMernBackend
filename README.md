# Calendar MERN - Backend

Backend del proyecto **Calendar MERN**, una aplicación de calendario para gestionar eventos personales, de estudio, familia y trabajo. Construido con **Node.js, Express y MongoDB (Mongoose)**, con autenticación mediante **JSON Web Tokens (JWT)**.

## Tecnologías

- Node.js
- Express 5
- MongoDB + Mongoose
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- CORS
- dotenv

## Requisitos

- Node.js 18 o superior
- Una base de datos MongoDB (local o MongoDB Atlas)
- npm

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd Calendar_Mern_Backend

# Instalar dependencias
npm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=4000
DBconnetion=mongodb://localhost:27017/calendar
DBpassword=tu_password
SECRET_JWT_SEED=tu_clave_secreta_para_jwt
```

> `.env` está incluido en `.gitignore` para evitar subir credenciales al repositorio.

## Ejecución

```bash
# Modo desarrollo (nodemon)
npm run dev

# Modo producción
npm start
```

El servidor se ejecutará en `http://localhost:${PORT}`.

## Endpoints de la API

### Autenticación — `/api/auth`

| Método | Ruta | Descripción | Auth |
|--------|------|-------------|------|
| POST | `/api/auth/new` | Registrar un nuevo usuario | No |
| POST | `/api/auth/` | Iniciar sesión y obtener JWT | No |
| GET | `/api/auth/renew` | Renovar el token JWT | Sí (Bearer) |

**Body para registro:**

```json
{
  "name": "Daniel",
  "email": "daniel@example.com",
  "password": "123456"
}
```

**Body para login:**

```json
{
  "email": "daniel@example.com",
  "password": "123456"
}
```

### Eventos — `/api/events`

Todas las rutas requieren el header:

```
x-token: <jwt>
```

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/events/` | Obtener los eventos del usuario autenticado |
| POST | `/api/events/` | Crear un evento |
| PUT | `/api/events/:id` | Actualizar un evento |
| DELETE | `/api/events/:id` | Eliminar un evento |

**Body para crear/actualizar un evento:**

```json
{
  "title": "Reunión de equipo",
  "notes": "Revisar avances del sprint",
  "start": "2026-11-01T09:00:00.000Z",
  "end": "2026-11-01T10:00:00.000Z",
  "category": "trabajo"
}
```

Categorías permitidas: `personal`, `estudio`, `familia`, `trabajo`.

`end` debe ser una fecha ISO 8601 posterior a `start`.

## Estructura del proyecto

```
Calendar_Mern_Backend/
├── controllers/        # Lógica de usuarios y eventos
├── DB/                 # Configuración de la conexión a MongoDB
├── helpers/            # Utilidades (JWT, validación de fechas)
├── middleware/         # Validación de campos y del token JWT
├── models/             # Esquemas de Mongoose (User, Event)
├── public/             # Archivos estáticos servidos por Express
├── routes/             # Definición de rutas de la API
├── index.js            # Punto de entrada del servidor
├── package.json
└── .env
```

## Licencia

ISC
