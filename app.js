import express from 'express'
const app = express()

import productsRouter from './routes/products.route.js'
import cartsRouter from './routes/carts.router.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
})


