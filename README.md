# API Turnos Médicos

API REST para gestión de turnos médicos, usuarios y doctores con autenticación JWT.

## Tecnologías
- Node.js + Express
- MongoDB + Mongoose
- Autenticación JWT (`jsonwebtoken`) y hash de contraseña (`bcrypt`)
- Swagger UI para documentación (`/api/docs`)
- Tests de integración con Mocha, Chai y Supertest

## Requisitos previos
- Node.js 18+
- Acceso a una base MongoDB

## Variables de entorno
Crear un archivo `.env` en la raíz con:
```
MONGO_URI=<completar con la cadena de conexión Mongo>
PERSISTENCE=MongoDB
FRONTEND_URL=http://localhost:5173
JWT_SECRET=<completar con la clave secreta>
PORT=8080
```

## Instalación
```
npm install
```

## Ejecutar en desarrollo
```
npm start
```
El servidor corre en `http://localhost:8080` (o el `PORT` definido en `.env`).

## Documentación de la API (Swagger)
- UI: `http://localhost:8080/api/docs`
- JSON: `http://localhost:8080/api/docs.json`
Para probar endpoints protegidos, usar el botón **Authorize** con `Bearer <token>`.

## Funcionalidades principales
- Auth: registro y login, generación de token JWT.
- Usuarios: CRUD y estadísticas de pacientes (rutas protegidas; alta solo con rol ADMIN).
- Doctores: CRUD protegido.
- Agendas (ScheduleTemplates): CRUD protegido.
- Turnos (Appointments): CRUD, listados y estadísticas protegidas.

## Tests
Los tests son de integración y esperan la API levantada en `http://localhost:8080`.
1) En una terminal: `npm start`
2) En otra terminal: `npm test`

## Endpoints base
Todos bajo `/api`, ejemplo:
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users` (requiere Bearer token)
- `POST /api/users` (requiere Bearer token con rol ADMIN)
- `GET /api/doctors` (requiere Bearer token)
- `POST /api/appointments` (requiere Bearer token)
