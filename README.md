# Backend2
REPOSITORIO PARA LA PRE-ENTREGA 4
Repositorio de entregas para la materia Programacion Backend II: Diseño y Arquitectura Backend por Lorenzo Suarez Almeyra, temática de eventos y sesiones 

## Base de datos

- Estare utilizando MongoDB

## Tecnologías
- Node.js
- Express
- Nodemon
- dotenv
- mongoose
- cookie-parser
- jsonwebtoken

## Instalación
```bash
npm install
```

## Iniciacion
```bash
npm run dev
```

## Rutas disponibles

### Health check

- `GET /api/health`

### Eventos

- `GET /api/events`
- `GET /api/events/:id`
- `POST /api/events/createEvent`

### Sesiones

- `GET /api/sessions`
- `GET /api/sessions/eventId/:eventId`
- `POST /api/sessions/createSession`
- `POST /api/sessions/register`
- `POST /api/sessions/login`
- `POST /api/sessions/logout`
- `GET /api/sessions/current`

## Flujo de datos
Request → Router → Controller → Service → Repository → DAO → Model

## Estructura de carpetas

```text
backend2/
├── src/
│   ├── app.js
│   ├── server.js
│   ├── config/
│   │   └── config.js
│   ├── controllers/
│   │   ├── event.controller.js
│   │   └── session.controller.js
│   ├── dao/
│   │   ├── event.dao.js
│   │   ├── session.dao.js
│   │   └── user.dao.js
│   ├── middlewares/
|   |   └── authentication.middleware.js
│   │   └── error.middleware.js
│   ├── models/
│   │   ├── eventModel.js
│   │   ├── sessionModel.js
│   │   └── userModel.js
│   ├── repositories/
│   │   ├── event.repository.js
│   │   ├── session.repository.js
│   │   └── user.repository.js
│   ├── routes/
│   │   ├── event.router.js
│   │   └── session.router.js
│   ├── services/
│   │   ├── event.service.js
│   │   └── session.service.js
│   └── utils/
│       └── hash.js
|       └── jwt.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
### Registrar un usuario

En el endpoint POST /api/sessions/register crea un usuario nuevo. El servidor debe estar iniciado y se debe enviar una peticion a:

```text
http://localhost:8080/api/sessions/register
```

El body debe ser un objeto JSON. Los campos `first_name`, `last_name`, `email` y `password` son obligatorios. El campo `role` no puede ser manipulado en el body

```json
{
    "first_name": "Bertram",
    "last_name": "García",
    "email": "bertram.garcia@example.com",
    "password": "12345678"
}
```

Durante el registro:

- Se eliminan los espacios al principio y al final del nombre, apellido y email.
- El email se convierte a minúsculas.
- Se valida que el email tenga un formato válido.
- La contraseña se guarda hasheada y no se devuelve en la respuesta.
- Se comprueba que el email no esté registrado previamente.

Respuesta exitosa (`201 Created`):

```json
{
    "status": "success",
    "payload": {
        "id": "ID_GENERADO_POR_MONGODB",
        "first_name": "Bertram",
        "last_name": "García",
        "email": "bertram.garcia@example.com",
        "role": "user"
    }
}
```

Si faltan campos obligatorios, el email no es válido o ya existe, la API devuelve una respuesta con `status: "error"` y un mensaje descriptivo.

### Login

El endpoint `POST /api/sessions/login` autentica al usuario. Se deben enviar el email y la contraseña en formato JSON:

```text
http://localhost:8080/api/sessions/login
```

Request:

```json
{
    "email": "bertram.garcia@example.com",
    "password": "12345678"
}
```

Response exitosa (`200 OK`):

```json
{
    "status": "success",
    "message": "Login correcto"
}
```

Además de la respuesta JSON, el servidor envía la cookie `currentUser` mediante el header `Set-Cookie`. Esta cookie contiene el token de autenticación y debe conservarse para realizar las peticiones protegidas.

### Usuario actual

El endpoint `GET /api/sessions/current` devuelve los datos incluidos en el token del usuario autenticado. La petición debe incluir la cookie `currentUser` obtenida durante el login:

```text
http://localhost:8080/api/sessions/current
```

Request:

```http
GET /api/sessions/current HTTP/1.1
Host: localhost:8080
Cookie: currentUser=TOKEN_JWT
```

Response exitosa (`200 OK`):

```json
{
    "status": "success",
    "payload": {
        "id": "ID_GENERADO_POR_MONGODB",
        "email": "bertram.garcia@example.com",
        "role": "user",
        "iat": 1725600000,
        "exp": 1725603600
    }
}
```

Si no se envía la cookie, la API responde con (`401 Unauthorized`):

```json
{
    "status": "error",
    "message": "No autenticado"
}
```

### Logout

El endpoint `POST /api/sessions/logout` elimina la cookie `currentUser`:

```text
http://localhost:8080/api/sessions/logout
```

Request:

```http
POST /api/sessions/logout HTTP/1.1
Host: localhost:8080
Cookie: currentUser=TOKEN_JWT
```

Response exitosa (`200 OK`):

```json
{
    "status": "success",
    "message": "Logout exitoso"
}
```

## Capturas de entregas
### Entrega 1
- ![api respondiendo OK](img/resEndpointHealt.png)
### Entrega 2
- ![captura de mongo de un usuario con la contraseña hasheada](img/contraHasheada.png)
- ![captura de la respuesta del endpoint sin el campo password](img/resEndpointRegister.png)
### Entrega 3
- ![captura de la respuesta de login respondiendo una cookie](img/login200conCookie.png)
- ![captura de /current devolviendo 200 con cookie](img/current200conCookie.png)
- ![caputra de /current devolviendo 401 sin cookie](img/current401sinCookie.png)