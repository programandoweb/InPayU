# InPayU
Gestor de pagos para la pasarela Latinoamericana PayU

Stack:
  Frontend:
    ReactJS
    UI MaterialUI
  Backend:
    PHP
    Framework Laravel

Instalación:
Al clonar el repositorio, nos dirigimos al directorio pwa y ejecutamos el comando npm install

Una vez culminada la instalación de la PWA, nos ubicamos en el directorio del backend y ejecutamos el comando composer install
Luego nos dirijimos al archivo .env  y configuramos los datos de la base de datos, por defecto la llamé inpayu, el nombre de usuario es root y sin clave porque lo trabajé en forma local.
Inmediatamente después ejecutamos php artisan migrate:fresh --seed para crear las tablas de la base de datos.


