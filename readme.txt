

Rutas:

Products:

'/api/products/' GET: trae todos los productos
'/api/products/' POST: agrega un nuevo producto
'/api/products/:pid' GET: trae un producto por id
'/api/products/:pid' PUT: edita un producto por id
'/api/products/:pid' DELETE: elimina un producto por id
'/api/products/mockingproducts' GET: genera productos falsos

Carts:

'/api/carts/' GET: trae todos los carritos
'/api/carts/' POST: agrega un nuevo carrito
'/api/carts/:cid' GET trae un carrito por id
'/api/carts/:cid' DELETE vacía un carrito por id
'/api/carts/:cid' PUT edita un carrito por id
'/api/carts/:cid/product/:pid' POST agrega un producto por id a un carrito por su id
'/api/carts/:cid/product/:pid' DELETE elimina una unidad del producto por id de un carrito por id
'/api/carts/:cid/product/:pid' PUT modifica un producto por id de un carrito por id
'/api/carts/:cid/purchase' POST para completar compra de un carrito
'/:cid/product/:pid/erase' DELETE borra un producto por completo

Users:

'/api/users/logout' GET cierra sessión de usuarios
'api/users/login' POST login de usuarios con passport
'/api/users/registroGithub' GET registra usuarios por Github
'/api/users/registroGoogle' GET registra usuarios por Google
'/api/users/' GET recibe datos del usuario desde Github
'/api/users/current' GET obtiene los datos del usuario actual
'/api/users/current' POST obtiene los datos del usuario actual a través de enviar el mail
'/api/users/forgot-password' POST envía mail para recuperar contraseña
'/api/users/create-new-password/:user/:token' POST envía el nuevo password al back
'/api/users/add-cart-to-user' PUT agrega un carrito a un usuario
'/premium/:uid' PUT cambia el rol del usuario si tiene documentos cargados
'/' DELETE elimina usuarios no conectados hace más de 48 hs o registrados y nunca logueados
'/:uid/documents' POST carga documentos con multer
'/delete-user' DELETE elimina un usuario
'/change-rol' PUT el administrador puede cambiar el rol de los clients

JWT:

'/api/jwt/login' POST genera token
'/api/jwt/login' GET valida token
'/api/jwt/current' GET devuelve usuario desde cookies si existe el token


Chat:

'/api/chat/' GET renderiza chat, verlo desde localhost, funciona con handlebars


Views: (con handlebars)

'/api/views/login' GET renderiza login
'/api/views/registro' GET renderiza registro
'/api/views/errorLogin' GET renderiza error en el login
'/api/views/errorRegistro' GET renderiza error en el registro
'/api/views/forgot-password' GET renderiza el ingreso de mail para recuperar contraseña
'/api/views/resetpassword/:user/:token' GET renderiza input para ingresar nuevo password

Real Time:

'/api/realtimeproducts/' GET renderiza productos en tiempo real


Mock:
'api/products/mockingproducts' mock de productos

