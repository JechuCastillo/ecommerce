# API E-COMMERCE 🚀
Api creada para la materia PROGRAMACION 2

## Funcionalidades
- Gestión de usuarios
    - Registro y Login de usuarios
    - Hash de contraseñas
    - Autenticación con JWT (roles: admin, cliente)
    - Middleware para proteger rutas y restringir acceso según su rol

- Gestión de productos
    - CRUD de productos para el admin
    - Validación de datos
    - Agregar/quitar productos de carrito

## Tecnologías
- Javascript
- NodeJS
- Express
- Dotenv
- MongoDB con Mongoose
- JWT
- Cors
- Crypto
- Cookie-parser
* Dependencias de desarrollo:
    - Nodemon
    - Jest
    - Supertest

# Para utilizar este repositorio
1. git clone https://github.com/JechuCastillo/ecommerce.git
2. cd ecommerce
3. npm install
4. Agregar el archivo .env y agregar:
    - PORT = 3000
    - MONGO_URI = "mongodb://TU-PROPIA-URI:27017/tubasededatos"
    - JWT_SECRET = "Una_clave_mega_ultra_archi_requetecontra_segura.255"
    - JWT_EXPIRES_IN = "1h" Tiempo de expiración del JWT
5. Ejecutar el proyecto con la opción que mas te guste



