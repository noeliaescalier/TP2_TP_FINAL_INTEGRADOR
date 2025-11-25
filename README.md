# API Turnos Médicos

API REST para gestión de turnos médicos, usuarios y doctores con autenticación JWT.

## Tecnologías
- Node.js + Express
- MongoDB + Mongoose
- Autenticación JWT (`jsonwebtoken`) y hash de contraseña (`bcrypt`)
- Swagger UI para documentación (`/api/docs`)
- Tests de integración con Mocha, Chai y Supertest

## Librerías utilizadas
- express (framework HTTP)
- mongoose (ODM MongoDB)
- dotenv (manejo de variables de entorno)
- cors (CORS middleware)
- jsonwebtoken (JWT)
- bcrypt (hash de contraseñas)
- nodemailer (envío de emails)
- swagger-ui-express (UI de Swagger)
- mocha, chai, supertest (testing)

## Requisitos previos
- Node.js 18+
- Acceso a una base MongoDB

## Variables de entorno
Crear un archivo `.env` en la raíz con:
```
MONGO_URI=<completar con la cadena de conexion Mongo>
PERSISTENCE=MongoDB
FRONTEND_URL=http://localhost:5173
JWT_SECRET=<completar con la clave secreta>
EMAIL_USER=<completar con la user email>
EMAIL_PASS=<completar con la password email>
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
Para probar endpoints protegidos, usar el boton **Authorize** con `Bearer <token>`.

## Formato de respuesta
La mayoría de los endpoints protegidos responden con:
```
{
  status: "success" | "error",
  data: <payload> // segun recurso
}
```
Los listados devuelven el array dentro de `data`.

## Funcionalidades principales
- Auth: registro y login, generacion de token JWT.
- Usuarios: CRUD y estadisticas de pacientes (rutas protegidas; alta solo con rol ADMIN).
- Doctores: CRUD protegido (al crear requiere `user` con role MEDICO).
- Agendas (ScheduleTemplates): CRUD protegido.
- Turnos (Appointments): CRUD, listados y estadisticas protegidas.

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
- `POST /api/doctors` (requiere Bearer token, cuerpo incluye `user` vinculado al medico)
- `GET /api/appointments` (requiere Bearer token)
- `POST /api/appointments` (requiere Bearer token)

## Usuarios de prueba
- User: paciente@test.com
  Password: password
- User: medico@test.com
  Password: password
- User: admin@test.com
  Password: password
