import express from 'express'
const app = express()
import path from 'path'

import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views/views.router.js'
import chatRouter from './routes/views/chat.router.js'
import { __dirname } from './utils.js'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import './dao/dbConfig.js'

import MessageManager from './dao/mongoManagers/MessageManager.js'
const messageManager = new MessageManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//rutas
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/realtimeproducts', viewsRouter)
app.use('/api/chat', chatRouter)

console.log(__dirname)

// archivos estaticos
//OJO QUE DETRÁS DE PUBLIC NO HAY BARRA, POR LO QUE DONDE SE NECESITE SEGUIR CON LA URL (EJEMPLO STYLE.CSS) HAY QUE PONERLE LA BARRA DELANTE
app.use(express.static(path.join(__dirname, '/public')))


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
//************chat*************** */

socketServer.on('connection', async (socket) =>{
  console.log(`Cliente conectado: ${socket.id}`)

  socket.on('disconnect',()=>{
      console.log(`Cliente desconectado: ${socket.id}`)
  })
  

  socket.emit('chat', await messageManager.getMessages()); //chat
  socket.on('update-chat', async (newMessage) => {//update-chat
    await messageManager.addMessage(newMessage)
      socketServer.sockets.emit('chat', await messageManager.getMessages());
  })


})
