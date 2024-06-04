# ExamenOrdinario
AppWeb de inventario de una ferretería

Para descargar las librerias usar
- `npm install`

Las principales librerias son:
- Express
- Pug
- Sass
- Passport

Para usar el perfil de administrador:
Usuario: 'admin'
Contraseña: 'admin'

Variables nescesarias en el archivo .env
- ACCES_TOKEN_SECRET
- PASSWORD_SALT_ROUNDS
- BASE_URL
- RSA_PRIVATE_KEY
- AES_PRIVATE_KEY

Por alguna razon que desconozco, si agrega productos en las listas de `compras` o `ventas` y no aparecen los productos o los precios, cierre sesion y vuelva a iniciar
