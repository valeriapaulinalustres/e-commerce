import express from 'express'
const app = express()

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views/views.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import './dao/dbConfig.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/realtimeproducts', viewsRouter)

// archivos estaticos
app.use(express.static(__dirname+'/public'))

//motores de plantilla
app.engine('handlebars',handlebars.engine())
app.set('view engine', 'handlebars')
app.set('views',__dirname+'/views')




const httpServer = app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
})

//websocket
const socketServer = new Server(httpServer)

const newProductsArray = []

socketServer.on('connection',socket=>{
    console.log(`Cliente conectado: ${socket.id}`)
 
    socket.on('disconnect',()=>{
        console.log(`Cliente desconectado: ${socket.id}`)
    })

    socket.on('newProduct',newProduct=>{
      console.log(newProduct)
      newProductsArray.push(newProduct)
      socketServer.emit('newProductsArray',newProductsArray)
    } )

})

