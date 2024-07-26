# Back end de la prueba

Este back end está bien protegido, tiene autenticación por token. Si no tienes el token, no puedes leer la API. También utilizamos bcrypt para encriptar las contraseñas.

## Base de datos

La base de datos fue montada en PostgreSQL y esta fue manejada desde el back end con un ORM llamado Sequelize.

A continuación te dejo el link de la documentación de la API en Postman:

[Documentación de la API](https://documenter.getpostman.com/view/29261239/2sA3kYjfa6)

## Levantar el Proyecto en Docker

Para levantar el proyecto utilizando Docker, sigue estos pasos:

1. Asegúrate de tener Docker y Docker Compose instalados en tu máquina.
2. Construye la imagen de Docker:

    ```sh
    docker-compose build
    ```

3. Levanta los servicios definidos en `docker-compose.yml`:

    ```sh
    docker-compose up
    ```

4. La aplicación debería estar corriendo en el puerto 8080. Puedes acceder a ella a través de `http://localhost:8080`.

### Variables de Entorno

Asegúrate de configurar las siguientes variables de entorno antes de levantar los servicios:

- `DATABASE_URL`: URL de conexión a la base de datos PostgreSQL.
- `TOKEN_SECRET`: Secreto utilizado para la autenticación por token.

Por ejemplo, puedes crear un archivo `.env` en el directorio raíz del proyecto con el siguiente contenido:

```plaintext
DATABASE_URL=postgres://postgres:root@127.0.0.1:5432/prueba-c
TOKEN_SECRET=eb9570f37711833e5eabc345b2c7d391acad7c6ef40ce157c36625b0e2e137bbf3914beb94fa0252e567413f48a31363ba6a0c823effc13bbf7e0b59b95b82c3
