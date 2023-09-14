# Microservicios Superflight con NestJS 🚀

Este proyecto implementa un sistema de microservicios usando [NestJS](https://nestjs.com/), un marco de trabajo de Node.js para la construcción de aplicaciones de servidor eficientes y escalables.

## Estructura del Proyecto

- **api-gateway**: Es el punto de entrada para todas las solicitudes y se encarga de redirigirlas al microservicio correspondiente.
- **microservice-flights**: Maneja todo lo relacionado con los vuelos.
- **microservice-passangers**: Se encarga de la gestión de pasajeros.
- **microservice-users**: Administra la información y autenticación de usuarios.

## Instalación

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
Navega al directorio del proyecto:


cd microservices-superflight
Instala las dependencias en cada microservicio y en el api-gateway:


cd api-gateway && npm install
cd ../microservice-flights && npm install
cd ../microservice-passangers && npm install
cd ../microservice-users && npm install
Ejecuta los microservicios individualmente desde sus respectivos directorios:


npm run start

#Documentación
Para más detalles sobre cómo funciona cada microservicio, consulta la documentación dentro de cada subdirectorio.

#Contribución
Las contribuciones son bienvenidas! Por favor, consulta el archivo CONTRIBUTING.md para más detalles.

#Licencia
Este proyecto está bajo la licencia MIT.

