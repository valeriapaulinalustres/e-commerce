import express from 'express'
const app = express()

 import productsRouter from './routes/products.route.js'
import cartsRouter from './routes/carts.router.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
})

//dos grupos de rutas: /products /carts *

// api/products *
//get / listar todos con el limit *
//get /:pid *
//post / agregar nuevo producto con id autogenerable, title, description, code, price, status: true, stock, category, thumbnails : [], *
// put /:pid modifica producto sin cambiar el id *
//delete /:pid *


// api/carts dos rutas
//post / crea carrito con id, products=[{}]
//get /:cid lista
//post /:cid/product/:pid agrega producto al carrito, sólo con id y quantity. si ya existe, aumentará cantidad
//productos.json y carrito.json

//validaciones de si no existe producto
