# Uso de la API REST
Hay dos posibilidades para usar la funcionalidad de obtener los enlaces de la url:
- Estar autenticado como un usuario (esto guardará en base de datos los enlaces obtenidos para la url)
  - Hay que registrarse usando el endpoint `auth/singup`
  - Obtener el token ya sea de la respuesta de `auth/singup` o bien de `auth/login`
  - Realizar la consulta al endpoint `/links`
- Ser un usuario anónimo (simplemente obtiene los enlaces de la url, sin guardarlos, aunque puede obtenerlos de la base de datos también para evitar hacer peticiones innecesarias)
  - Realizar la consulta al endpoint `/links/anonymous`

El uso de todos los endpoints está documentado en [swagger](#swagger).

# Obtener links por CLI
El comando es `nnergix-cli`<br>
Necesita que se le pase como argumento la web en cuestión. Ejemplo:<br>
`nnergix-cli http://google.com`

<h1 id='swagger'>SWAGGER</h1>
Acceso a la documentación de la API en swagger en: <a href="http://localhost:3000">localhost:3000</a>

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