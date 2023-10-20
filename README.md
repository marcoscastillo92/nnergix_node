# SWAGGER
Acceso a la documentación de la API en swagger en: [http://localhost:3000](http://localhost:3000)

# Posibles mejoras:
Las posibles mejoras que se me ocurren para aplicar serían:

- CRUD de usuarios
- Consultar enlaces por usuarios
- Refactorización de los tests y separación por ficheros
- Utilización de clases para los modelos de Sequelize
- Cambiar arquitectura del proyecto por una más limpia
- Cache de llamadas para mismas URLs
- Limitar el tiempo de la petición para scapear la web para evitar cuelgues
- Implementar una comprobación de los enlaces almacenados para que después de X tiempo se vuelvan a scrapear con la próxima petición para mantenerse actualizados o cronjobs
- Formatear urls para que sean equivalentes, por ejemplo: https://google.com no es lo mismo que http://google.com o http://google.com/ sin embargo el resultado de los enlaces sí, hacer que se formateen a un equivalente como por ejemplo: google.com
- Añadir funcionalidad para scrapear varias urls en una petición usando workers para paralelizar su ejecución
- Verificación del formato de los datos de entrada del usuario tales como email y password